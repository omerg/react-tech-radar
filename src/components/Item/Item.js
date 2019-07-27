import React, {useState, useContext} from 'react';
import {ItemWrapper} from "./Item.style";
import {ThemeContext} from "../theme-context";
import PropTypes from "prop-types";

const MAX_LENGTH = 15;

function Item(props) {

    //create ref
    let ref = React.createRef();

    //context variables
    const {fontSize, fontFamily} = useContext(ThemeContext);

    //state variables
    const [name, setName] = useState(props.data.name);

    const shortName = props.data.name.length > MAX_LENGTH ?
        props.data.name.substr(0, MAX_LENGTH) + "..." :
        props.data.name;

    const onMouseOver = () => {
        ref.style.opacity = '1.0';
        ref.style.fontWeight = "Bold";
        setName(props.name);
    };

    const onMouseOut = () => {
        ref.style.opacity = '0.7';
        ref.style.fontWeight = "Normal";
        setName(shortName);
    };

    return (
        <ItemWrapper
            className="blip"
            id={'blip-' + props.data.id}
            transform={" rotate(" + props.rotateDegrees + ") translate(" + (props.data.x) + "," + (props.data.y) + ")"}
            onMouseEnter={onMouseOver}
            onMouseLeave={onMouseOut}
            ref={el => ref = el}
        >
            <circle r={"4px"}/>
            <text
                className={"name"}
                dx={"7px"}
                dy={"7px"}
                fontSize={fontSize}
                fontFamily={fontFamily}
            >
                {name}
            </text>
        </ItemWrapper>
    )
}

Item.propTypes = {
    rotateDegrees: PropTypes.number.isRequired,
    key: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired
};

export default Item;
