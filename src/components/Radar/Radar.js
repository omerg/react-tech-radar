import React, {useState, useEffect, useContext} from 'react';
import {RadarContents} from "./Radar.style";
import PropTypes from 'prop-types';

import Quadrant from "../Quadrant/Quadrant";
import {getColorScale, ThemeContext} from "../theme-context";
import * as Tabletop from "tabletop";

//when point coordinates are calculated randomly, sometimes point coordinates
// get so close that it would be hard to read the textual part. When such
//collisions occur, the position generator retries. This constant defines the
//number of trials where it has to stop.
const MAX_COLLISION_RETRY_COUNT = 350;

//This value is used to determine whether a collision retry should be triggered or not.
const TOLERANCE_CONSTANT = 6;

//Data fetched from tabletop is cached for this number of seconds.
const DEFAULT_CACHE_TTL = 120;

//default radar width
const DEFAULT_WIDTH = 700;

function Radar(props) {

    //manage optional variables
    const width = props.width || DEFAULT_WIDTH;
    const rings = props.rings || [""];

    //state variable data
    const [data, setData] = useState([]);

    //context variables
    const {fontSize, fontFamily, colorScale} = useContext(ThemeContext);

    //margin of radar
    const margin = 5;

    //some internally used constants
    const angle = 360 / props.quadrants.length;

    //collision detection constants
    const toleranceX = width / rings.length / 100 * TOLERANCE_CONSTANT * 4;
    const toleranceY = (props.fontSize || fontSize);

    console.log("Collision Tolerance (Pixels):");
    console.log("x: " + toleranceX);
    console.log("y: " + toleranceY);

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

        for (let i in data) {

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

        console.log("Collision Count: " + collisionCount);

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

        const getPositionByQuadrant = () => {
            const ringCount = rings.length;
            const margin = 0.1;
            const ringIndex = rings.indexOf(entry.ring);
            const posStart = (1 / ringCount * ringIndex) + (1 / ringCount * margin);
            const posLength = Math.random() * ((1 / ringCount) - (2 * (1 / ringCount * margin)));
            return posStart + posLength;
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

        const randomPosition = getPositionByQuadrant(entry);
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

    //effect is used to fetch data
    //when component is mounted.
    useEffect(() => {

        const getDataFromCache = (cacheKey) => {

            const scheduleInvalidate = () => {

                const radarCache = setTimeout(() => {
                    console.log("Radar cache invalidated: " + radarCache);
                    localStorage.removeItem("RADAR_DATA_" + props.dataUrl);
                }, timeToLive * 1000);
                console.log("Radar cache set: " + radarCache);
            };

            const timeToLive = props.cacheTTL || DEFAULT_CACHE_TTL;

            const cachedData = localStorage.getItem("RADAR_DATA_" + props.dataUrl);

            if (cachedData) {

                console.log("Cache hit");
                setData(JSON.parse(cachedData));

                //clean cache when expired
                scheduleInvalidate();

                return;
            }

            Tabletop.init({
                    key: cacheKey,
                    callback: (data, tabletop) => {

                        //update state
                        setData(data);

                        //update cache
                        localStorage.setItem("RADAR_DATA_" + props.dataUrl, JSON.stringify(data))

                        //clean cache when expired
                        scheduleInvalidate();

                    },
                    simpleSheet: true
                }
            )
        };

        if (props.data) {
            setData(props.data);
        } else if (props.dataUrl) {
            getDataFromCache(props.dataUrl);
        } else {
            console.warn("No Data Provided");
        }

    }, [props.data, props.dataUrl, props.cacheTTL]);

    const points = processRadarData(props.quadrants, rings, data);

    return (
        //theme context variables can be overridden by props
        <ThemeContext.Provider value={{
            fontSize: props.fontSize || fontSize,
            fontFamily: props.fontFamily || fontFamily,
            colorScale: props.colorScaleIndex ? getColorScale(props.colorScaleIndex) : colorScale
        }}>
            <RadarContents
                width={width}
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
    rings: PropTypes.array.isRequired,
    width: PropTypes.number,
    data: PropTypes.array,
    dataUrl: PropTypes.string,
    cacheTTL: PropTypes.number,
    fontSize: PropTypes.number,
    colorScaleIndex: PropTypes.number
};

export default Radar;
