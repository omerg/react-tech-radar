import React from 'react';
import PropTypes from "prop-types";

function Line(props) {

    return (
        <line
            x1="0" y1="0"
            x2={props.x2}
            y2={props.y2}
            stroke={props.stroke}
        >
        </line>
    )
}

Line.propTypes = {
    x2: PropTypes.number.isRequired,
    y2: PropTypes.number.isRequired,
    stroke: PropTypes.string.isRequired
};

export default Line;
