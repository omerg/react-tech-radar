import React, {Component, Fragment} from 'react';
import Text from "../Text/Text";
import Path from "../Path/Path";
import Line from "../Line/Line";
import * as d3 from "d3";
import Item from "../Item/Item";
import {QuadrantWrapper} from "./Quadrant.style";

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
const ThemeContext = React.createContext(colorScale);

class Quadrant extends Component {

    //get theme from global context
    static contextType = ThemeContext;

    constructor(props) {
        super(props);

        //create ref
        this.ref = React.createRef();

        const ringWidth = 0.95 * this.props.width / 2;
        const ring_unit = ringWidth / this.props.rings.length;

        this.state = {
            ringWidth: ringWidth,
            ring_unit: ring_unit
        };

    }

    render() {
        const radialAngle = 2 * Math.PI / 360 * this.props.angle;
        return (
            <QuadrantWrapper
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                ref={el => this.ref = el}
            >
                <g transform={this.props.transform}>
                    <Line
                        x2={this.state.ringWidth}
                        y2={0}
                        stroke={this.context(this.props.index)}
                    />


                    {this.props.rings.map((ringValue, ringIndex) => {
                        const ringsLength = this.props.rings.length;
                        const title = ringIndex === this.props.rings.length - 1 ? this.props.name : null;
                        return (
                            <g key={this.props.index + "-" + ringIndex}>
                                <Text
                                    name={ringValue}
                                    dx={20 + (ringIndex * this.state.ringWidth / ringsLength)}
                                    fontSize={this.props.fontSize}
                                />
                                <Path
                                    quadIndex={this.props.index}
                                    ringIndex={ringIndex}
                                    ringWidth={this.state.ringWidth}
                                    ringsLength={ringsLength}
                                    quad_angle={radialAngle}
                                    outerRadius={(ringIndex + 1) / ringsLength}
                                    innerRadius={ringIndex / ringsLength}
                                    title={title}
                                />
                            </g>
                        )
                    })}
                </g>
                {this.props.points.map((value, index) => <Item key={index} data={value}/>)}
            </QuadrantWrapper>


        )

    }

    onMouseOver = () => {
        this.ref.style.opacity = '1.0';
    };

    onMouseOut = () => {
        this.ref.style.opacity ='0.7';
    };
}

export default Quadrant;
