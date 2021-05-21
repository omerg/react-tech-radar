import React, {useContext} from 'react';
import TextWrapper from "./Text.style";
import {ThemeContext} from "../theme-context";

function Text(props) {

    //context variables
    const {fontSize, fontFamily} = useContext(ThemeContext);

    return (
        <TextWrapper className={"quadrant"}
                     fontSize={fontSize}
                     fontFamily={fontFamily}
                     dx={props.dx}
                     dy={props.dy}
        >
            {props.name}
        </TextWrapper>
    )
}

export default Text;
