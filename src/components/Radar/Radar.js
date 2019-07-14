import React, {Component} from 'react';
import {RadarContents} from "./Radar.style";

import Quadrant from "../Quadrant/Quadrant";
import {colorScale, ThemeContext} from "../../theme-context";
import * as Tabletop from "tabletop";

const MAX_COLLISION_RETRY_COUNT = 350;
const TOLERANCE_CONSTANT = 6;

class Radar extends Component {

    constructor(props) {
        super(props);

        const angle = 360 / this.props.quadrants.length;
        this.toleranceX = this.props.width / this.props.rings.length / 100 * TOLERANCE_CONSTANT * 4;
        this.toleranceY = (this.props.fontSize | 12);

        //console.log("Collision Tolerance (Pixels):");
        //console.log("x: " + this.toleranceX);
        //console.log("y: " + this.toleranceY);

        //create ref
        this.myRef = React.createRef();

        this.state = {
            angle: angle,
            margin: 5,
            points: [],
            data: []
        }
    }

    componentDidMount() {
        if ((this.props.data === null ||
            this.props.data === undefined ||
            this.props.data.length === 0) &&
            this.props.dataUrl) {
            this.getDataFromCache(this.props.dataUrl);
        } else {
            this.setState({
                data: this.props.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.state.data !== prevState.data) {
            const points = this.processRadarData(this.props.quadrants, this.props.rings, this.state.data);
            this.setState({
                points: points
            });
        }
    }

    render() {

        return (
            <ThemeContext.Provider value={colorScale}>
                <RadarContents
                    width={this.props.width}
                    height={this.props.width}
                    style={{margin: this.state.margin}}
                    ref={el => this.myRef = el}>
                    <g transform={"translate(" + this.props.width / 2 + "," + this.props.width / 2 + ")"}>
                        {this.props.quadrants.map((value, index) => {

                            //get points that belong to this quadrant
                            const filteredPoints = this.state.points.filter((element) => element.quadrant === value);

                            return (
                                <g key={index}>
                                    <Quadrant
                                        transform={" rotate(" + 360 / this.props.quadrants.length * index + ") translate(" + this.state.margin + "," + this.state.margin + ")  "}
                                        rotateDegrees={360 / this.props.quadrants.length * index}
                                        width={this.props.width - (2 * this.state.margin)}
                                        index={index}
                                        rings={this.props.rings}
                                        points={filteredPoints}
                                        angle={this.state.angle}
                                        name={value}
                                        fontSize={this.props.fontSize}
                                    />
                                </g>)
                        })}
                    </g>
                </RadarContents>
            </ThemeContext.Provider>
        )
    }

    processRadarData = (quadrants, rings, data) => {

        //order by rings. this will result in better collision
        //detection performance since it is harder to relocate
        // the points in the core ring
        data.sort(function(a, b) {
            return rings.indexOf(a.ring) - rings.indexOf(b.ring);
        });

        let collisionCount = 0;

        // go through the data
        const results = [];

        for (let i in data) {

            const entry = data[i];

            let quadrant_delta = 0;

            // figure out which quadrant this is
            const angle = 2 * Math.PI / this.props.quadrants.length;
            for (let j = 0, len = quadrants.length; j < len; j++) {
                if (quadrants[j] === entry.quadrant) {
                    quadrant_delta = angle * j;
                }
            }
            const coordinates = this.getRandomCoordinates(rings, entry, angle, quadrant_delta, results, collisionCount);
            if ( collisionCount < MAX_COLLISION_RETRY_COUNT) {
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

    getRandomCoordinates = (rings, entry, angle, quadrant_delta, results, collisionCount = 0) => {

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
                if (Math.abs(result.x - coordinates.x) <= this.toleranceX &&
                    Math.abs(result.y - coordinates.y) <= this.toleranceY) {

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
        const ringWidth = this.props.width / 2;

        //theta is the position in the quadrant
        const theta = (positionAngle * angle) + quadrant_delta;
        const r = randomPosition * ringWidth;

        const data = polarToCartesian(r, theta);

        //recalculate if there is a collision
        const collision = hasCollision(results, data);
        if (collision) {
            return this.getRandomCoordinates(rings, entry, angle, quadrant_delta, results, collisionCount)
        }

        //report number of collisions detected
        data.collisionCount = collisionCount;
        return data;
    };

    getDataFromCache(cacheKey) {

        localStorage.removeItem("RADAR_DATA_" + this.props.dataUrl);

        const timeToLive = this.props.cacheTTL | 10;

        const cachedData = localStorage.getItem("RADAR_DATA_" + this.props.dataUrl);

        if (cachedData) {
            console.log("cache hit");
            this.setState({data: JSON.parse(cachedData)});
            return;
        }

        Tabletop.init({
                key: cacheKey,
                callback: (data, tabletop) => {

                    //update state
                    this.setState({data: data});

                    //update cache
                    localStorage.setItem("RADAR_DATA_" + this.props.dataUrl, JSON.stringify(data))

                    //clean cache when expired
                    const radarCache = setTimeout(() => {
                        console.log("Radar cache invalidated: " + radarCache);
                        localStorage.removeItem("RADAR_DATA_" + this.props.dataUrl);
                    }, timeToLive * 1000);
                    console.log("Radar cache set: " + radarCache);

                },
                simpleSheet: true
            }
        )
    }
}

export default Radar;
