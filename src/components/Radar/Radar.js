import React, {useState, useEffect} from 'react';
import {RadarContents} from "./Radar.style";
import PropTypes from 'prop-types';

import Quadrant from "../Quadrant/Quadrant";
import {colorScale, DEFAULT_FONT_SIZE, ThemeContext} from "../../theme-context";
import * as Tabletop from "tabletop";

const MAX_COLLISION_RETRY_COUNT = 350;
const TOLERANCE_CONSTANT = 6;
const DEFAULT_CACHE_TTL = 120;

function Radar(props) {

    const margin = 5;
    const angle = 360 / props.quadrants.length;

    const [data, setData] = useState([]);

    const toleranceX = props.width / props.rings.length / 100 * TOLERANCE_CONSTANT * 4;
    const toleranceY = (props.fontSize || DEFAULT_FONT_SIZE);

    console.log("Collision Tolerance (Pixels):");
    console.log("x: " + toleranceX);
    console.log("y: " + toleranceY);

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
        const ringWidth = props.width / 2;

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

        getDataFromCache(props.dataUrl);
    }, [props.dataUrl, props.cacheTTL]);

    const points = processRadarData(props.quadrants, props.rings, data);

    return (
        <ThemeContext.Provider value={colorScale}>
            <RadarContents
                width={props.width}
                height={props.width}
                style={{margin: margin}}
            >
                <g transform={"translate(" + props.width / 2 + "," + props.width / 2 + ")"}>
                    {props.quadrants.map((value, index) => {

                        //get points that belong to this quadrant
                        const filteredPoints = points.filter((element) => element.quadrant === value);

                        return (
                            <g key={index}>
                                <Quadrant
                                    transform={" rotate(" + 360 / props.quadrants.length * index + ") translate(" + margin + "," + margin + ")  "}
                                    rotateDegrees={360 / props.quadrants.length * index}
                                    width={props.width - (2 * margin)}
                                    index={index}
                                    rings={props.rings}
                                    points={filteredPoints}
                                    angle={angle}
                                    name={value}
                                    fontSize={props.fontSize}
                                />
                            </g>)
                    })}
                </g>
            </RadarContents>
        </ThemeContext.Provider>
    );

}

Radar.propTypes = {
    width: PropTypes.number.isRequired,
    rings: PropTypes.array.isRequired,
    quadrants: PropTypes.array.isRequired,
    data: PropTypes.array,
    dataUrl: PropTypes.string,
    cacheTTL: PropTypes.number,
    fontSize: PropTypes.number
};

export default Radar;
