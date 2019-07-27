import React, {useContext} from 'react';
import Text from "../Text/Text";
import Path from "../Path/Path";
import Line from "../Line/Line";
import Item from "../Item/Item";
import {QuadrantWrapper} from "./Quadrant.style";
import {ThemeContext} from "../theme-context";
import PropTypes from "prop-types";

function Quadrant(props) {

    //context variables
    const {fontSize, fontFamily, colorScale} = useContext(ThemeContext);

    let ref = React.createRef();
    const ringWidth = props.width / 2;
    const radialAngle = 2 * Math.PI / 360 * props.angle;

    const onMouseOver = () => {
        ref.style.opacity = '1.0';
    };

    const onMouseOut = () => {
        ref.style.opacity = '0.7';
    };

    const onMouseClick = () => {
        // const svg = d3.select(ref);
        // svg.transition()
        //     .duration(2000)
        //     .style("transform", "translate(-300px, -300px) scale(" + 2 + ") ")
    };

    return (
        <QuadrantWrapper
            transform={props.transform}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onClick={onMouseClick}
            ref={el => ref = el}
        >

            <Line
                x2={ringWidth}
                y2={0}
                stroke={colorScale(props.index)}
            />

            {props.rings.map((ringValue, ringIndex) => {
                const ringsLength = props.rings.length;
                const title = ringIndex === props.rings.length - 1 ? props.name : null;
                return (
                    <g key={props.index + "-" + ringIndex}>
                        <Text
                            name={ringValue}
                            dx={20 + (ringIndex * ringWidth / ringsLength)}
                            fontSize={fontSize}
                            fontFamily={fontFamily}
                        />
                        <Path
                            quadIndex={props.index}
                            ringIndex={ringIndex}
                            ringWidth={ringWidth}
                            ringsLength={ringsLength}
                            quad_angle={radialAngle}
                            outerRadius={(ringIndex + 1) / ringsLength}
                            innerRadius={ringIndex / ringsLength}
                            title={title}
                        />
                    </g>
                )
            })}
            {props.points.map((value, index) => {
                    return (
                        <Item
                            rotateDegrees={-props.rotateDegrees}
                            key={index}
                            data={value}/>
                    )
                }
            )}

        </QuadrantWrapper>
    )
}

Quadrant.propTypes = {
    transform: PropTypes.string.isRequired,
    rotateDegrees: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    rings: PropTypes.array.isRequired,
    points: PropTypes.array.isRequired,
    angle: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
};

export default Quadrant;
