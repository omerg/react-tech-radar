import React, {Component} from 'react';
import Text from "../Text/Text";
import Path from "../Path/Path";
import Line from "../Line/Line";
import Item from "../Item/Item";
import {QuadrantWrapper} from "./Quadrant.style";
import {ThemeContext} from "../theme-context";

class Quadrant extends Component {

    static contextType = ThemeContext;

    constructor(props) {
        super(props);

        //create ref
        this.ref = React.createRef();

        const ringWidth = this.props.width / 2;
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
                transform={this.props.transform}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                onClick={this.onMouseClick}
                ref={el => this.ref = el}
            >

                <Line
                    x2={this.state.ringWidth}
                    y2={0}
                    stroke={this.context.colorScale(this.props.index)}
                />

                {this.props.rings.map((ringValue, ringIndex) => {
                    const ringsLength = this.props.rings.length;
                    const title = ringIndex === this.props.rings.length - 1 ? this.props.name : null;
                    return (
                        <g key={this.props.index + "-" + ringIndex}>
                            <Text
                                name={ringValue}
                                dx={20 + (ringIndex * this.state.ringWidth / ringsLength)}
                                fontSize={this.context.fontSize}
                                fontFamily={this.context.fontFamily}
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
                {this.props.points.map((value, index) => {
                        return (
                            <Item
                                rotateDegrees={-this.props.rotateDegrees}
                                key={index} data={value}
                                fontSize={this.props.fontSize}/>
                        )
                    }
                )}

            </QuadrantWrapper>


        )

    }

    onMouseOver = () => {
        this.ref.style.opacity = '1.0';
    };

    onMouseOut = () => {
        this.ref.style.opacity = '0.7';
    };

    onMouseClick = () => {
        // const svg = d3.select(this.ref);
        // svg.transition()
        //     .duration(2000)
        //     .style("transform", "translate(-300px, -300px) scale(" + 2 + ") ")
    };
}

export default Quadrant;
