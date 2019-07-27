import React, {Component} from 'react';
import TextWrapper from "./Text.style";
import {ThemeContext} from "../theme-context";

class Text extends Component {

    static contextType = ThemeContext;

    constructor(props) {
        super(props);

        //create ref
        this.myRef = React.createRef();

        //create state
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <TextWrapper className={"quadrant"}
                  fontSize={this.context.fontSize}
                  fontFamily={this.context.fontFamily}
                  dx={this.props.dx}
            >
                {this.props.name}
            </TextWrapper>
        )

    }
}

export default Text;
