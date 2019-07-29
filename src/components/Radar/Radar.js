import React, {useContext} from 'react';
import {RadarContents} from "./Radar.style";
import PropTypes from 'prop-types';

import Quadrant from "../Quadrant/Quadrant";
import {getColorScale, ThemeContext} from "../theme-context";

//when point coordinates are calculated randomly, sometimes point coordinates
// get so close that it would be hard to read the textual part. When such
//collisions occur, the position generator retries. This constant defines the
//number of trials where it has to stop.
const MAX_COLLISION_RETRY_COUNT = 350;

//This value is used to determine whether a collision retry should be triggered or not.
const TOLERANCE_CONSTANT = 6;

//default radar width
const DEFAULT_WIDTH = 700;

//radius of rings diminish as they move away from the center
const RADIUS_DIMINISH_CONSTANT = 1.5;

//extend width to right so that overflow text would be visible
const RIGHT_EXTENSION = 1.1;

function Radar(props) {

    //manage optional variables
    const width = props.width || DEFAULT_WIDTH;
    const rings = props.rings || [""];
    const radiusDiminishConstant = props.radiusDiminish || RADIUS_DIMINISH_CONSTANT;
    const data = props.data || [];
    if (data.length === 0) {
        console.log("No Data Provided")
    }

    //context variables
    const {fontSize, fontFamily, colorScale} = useContext(ThemeContext);

    //margin of radar
    const margin = 5;

    //some internally used constants
    const angle = 360 / props.quadrants.length;

    //collision detection constants
    const toleranceX = width / rings.length / 100 * TOLERANCE_CONSTANT * 4;
    const toleranceY = (props.fontSize || fontSize);

    //console.log("Collision Tolerance (Pixels):");
    //console.log("x: " + toleranceX);
    //console.log("y: " + toleranceY);

    //given the ring and quadrant of a value,
    //calculates x and y coordinates
    const processRadarData = (quadrants, rings, data) => {

        //order by rings. this will result in better collision
        //detection performance since it is harder to relocate
        // the points in the core ring
        data.sort(function (a, b) {
            return rings.indexOf(a.ring) - rings.indexOf(b.ring);
        });

        let collisionCount = 0;

        // go through the data
        const results = [];

        for (const i in data) {

            const entry = data[i];

            let quadrant_delta = 0;

            // figure out which quadrant this is
            const angle = 2 * Math.PI / props.quadrants.length;
            for (let j = 0, len = quadrants.length; j < len; j++) {
                if (quadrants[j] === entry.quadrant) {
                    quadrant_delta = angle * j;
                }
            }
            const coordinates = getRandomCoordinates(rings, entry, angle, quadrant_delta, results, collisionCount);
            if (collisionCount < MAX_COLLISION_RETRY_COUNT) {
                collisionCount = coordinates.collisionCount;
            }

            const blip = {
                id: i,
                name: entry.name,
                quadrant: entry.quadrant,
                x: coordinates.x,
                y: coordinates.y
            };

            results.push(blip);
        }

        //console.log("Collision Count: " + collisionCount);

        return results;
    };

    //used by processRadarData.
    //generates random coordinates within given range
    const getRandomCoordinates = (rings, entry, angle, quadrant_delta, results, collisionCount = 0) => {

        const polarToCartesian = (r, t) => {
            const x = r * Math.cos(t);
            const y = r * Math.sin(t);
            return {x: x, y: y};
        };

        const getPositionByQuadrant = (radiusArray) => {
            const ringCount = rings.length;
            const margin = 0.2;
            const ringIndex = rings.indexOf(entry.ring);
            const posStart = radiusArray[ringIndex] + (1 / ringCount * margin);
            const posLength = Math.random() * ((radiusArray[ringIndex + 1] - radiusArray[ringIndex]) - (2 * (1 / ringCount * margin)));
            return posStart + posLength;
        };

        const calculateRadiusDiminish = (nrOfRings) => {

            let max = 1;

            //create the array. each value represents
            //the share of total radius among rings.
            let arr = [1];
            for (let i = 1; i < nrOfRings; i++) {
                max = max * radiusDiminishConstant;
                arr.push(max);
            }

            //calculate total shares of radius
            const sum = arr.reduce((a, b) => a + b);
            arr = arr.map((a) => a / sum);

            //now, each member of the array represent
            //the starting position of ring in the
            //circle
            arr.reverse();
            for (let i = 1; i < nrOfRings; i++) {
                arr[i] = arr[i - 1] + arr[i];
            }

            //add 0 for the center of the circle
            arr.push(0);

            //sort the array so that 0 is at the start
            arr.sort();

            return arr;
        };

        const hasCollision = (results, coordinates) => {

            if (collisionCount >= MAX_COLLISION_RETRY_COUNT) {
                return false;
            }

            for (const result of results) {
                if (Math.abs(result.x - coordinates.x) <= toleranceX &&
                    Math.abs(result.y - coordinates.y) <= toleranceY) {

                    if (++collisionCount >= MAX_COLLISION_RETRY_COUNT) {
                        console.log("max collision retry limit reached: " + collisionCount);
                    }
                    return true;
                }
            }
            return false;
        };

        const radiusArray = calculateRadiusDiminish(props.rings.length);

        const randomPosition = getPositionByQuadrant(radiusArray);
        const positionAngle = Math.random();
        const ringWidth = width / 2;

        //theta is the position in the quadrant
        const theta = (positionAngle * angle) + quadrant_delta;
        const r = randomPosition * ringWidth;

        const data = polarToCartesian(r, theta);

        //recalculate if there is a collision
        const collision = hasCollision(results, data);
        if (collision) {
            return getRandomCoordinates(rings, entry, angle, quadrant_delta, results, collisionCount)
        }

        //report number of collisions detected
        data.collisionCount = collisionCount;
        return data;
    };

    const points = processRadarData(props.quadrants, rings, data);

    return (
        //theme context variables can be overridden by props
        <ThemeContext.Provider value={{
            fontSize: props.fontSize || fontSize,
            itemFontSize: props.itemFontSize || props.fontSize || fontSize,
            fontFamily: props.fontFamily || fontFamily,
            colorScale: props.colorScaleIndex ? getColorScale(props.colorScaleIndex) : colorScale
        }}>
            <RadarContents
                width={width * RIGHT_EXTENSION}
                height={width}
                style={{margin: margin}}
            >
                <g transform={"translate(" + width / 2 + "," + width / 2 + ")"}>
                    {props.quadrants.map((value, index) => {

                        //get points that belong to this quadrant
                        const filteredPoints = points.filter((element) => element.quadrant === value);

                        return (
                            <g key={index}>
                                <Quadrant
                                    transform={" rotate(" + 360 / props.quadrants.length * index + ") translate(" + margin + "," + margin + ")  "}
                                    rotateDegrees={360 / props.quadrants.length * index}
                                    width={width - (2 * margin)}
                                    index={index}
                                    rings={rings}
                                    points={filteredPoints}
                                    angle={angle}
                                    name={value}
                                    radiusDiminish={radiusDiminishConstant}
                                />
                            </g>)
                    })}
                </g>
            </RadarContents>
        </ThemeContext.Provider>
    );

}

Radar.propTypes = {
    quadrants: PropTypes.array.isRequired,
    rings: PropTypes.array,
    data: PropTypes.array,
    width: PropTypes.number,
    fontSize: PropTypes.number,
    itemFontSize: PropTypes.number,
    colorScaleIndex: PropTypes.number,
    radiusDiminish: PropTypes.number
};

export default Radar;
