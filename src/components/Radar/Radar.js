import React, {Component} from 'react';
import * as d3 from "d3";
import {QuadrantGroup, RadarContents} from "./Radar.style";

import Quadrant from "../Quadrant/Quadrant";
import Item from "../Item/Item";

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
export const ThemeContext = React.createContext(colorScale);

class Radar extends Component {

    //get theme from global context
    static contextType = ThemeContext;

    constructor(props) {
        super(props);
        const angle = 360 / this.props.quadrants.length;
        const points = this.processRadarData(this.props.quadrants, this.props.rings, this.props.data);

        //create ref
        this.myRef = React.createRef();

        this.state = {
            angle: angle,
            points: points
        }
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.data !== prevProps.data) {
            const points = this.processRadarData(this.props.quadrants, this.props.rings, this.props.data);
            this.setState({
                points: points
            });
        }
    }

    render() {
        return (
            <RadarContents
                width={this.props.width}
                height={this.props.width}
                ref={el => this.myRef = el}>
                <g transform={"translate(" + this.props.width / 2 + "," + this.props.width / 2 + ")"}>
                    {this.props.quadrants.map((value, index) => {

                        //get points that belong to this quadrant
                        const data = this.props.data.filter((element) => element.quadrant === value);
                        const points = this.processRadarData(this.props.quadrants, this.props.rings, data);
                        const margin = 5;

                        return (
                            <g key={index}>
                                <Quadrant
                                    transform={" rotate(" + 360 / this.props.quadrants.length * index + ") translate(" + margin + "," + margin + ")  "}
                                    width={this.props.width}
                                    index={index}
                                    rings={this.props.rings}
                                    points={points}
                                    angle={this.state.angle}
                                    name={value}
                                    fontSize={this.props.fontSize}
                                />
                            </g>)
                    })}
                </g>

            </RadarContents>
        )
    }

    processRadarData = (quadrants, rings, data) => {

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

            const randomPosition = this.getPositionByQuadrant(rings, entry);
            const positionAngle = Math.random();
            const ringWidth = 0.95 * this.props.width / 2;

            //theta is the position in the quadrant
            const theta = (positionAngle * angle) + quadrant_delta;
            const r = randomPosition * ringWidth;
            const cart = this.polarToCartesian(r, theta);
            const blip = {
                id: i,
                name: entry.name,
                x: cart[0],
                y: cart[1]
            };

            results.push(blip);
        }
        return results;
    };

    polarToCartesian = (r, t) => {
        const x = r * Math.cos(t);
        const y = r * Math.sin(t);
        return [x, y];
    };

    getPositionByQuadrant = (rings, history) => {
        const ringCount = rings.length;
        const margin = (1 / ringCount * 0.1);
        const ringIndex = rings.indexOf(history.ring);
        const posStart = (1 / ringCount * ringIndex) + margin;
        const posLength = Math.abs((Math.random() / ringCount) - (margin * 2));
        return posStart + posLength;
    };
}

export default Radar;
