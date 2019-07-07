import React, {Component} from 'react';
import TextWrapper from "./Text.style";

class Text extends Component {

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
                  fontSize={this.props.fontSize}
                  dx={this.props.dx}
            >
                {this.props.name}
            </TextWrapper>
        )

    }
}

Text.defaultProps = {
    fontSize: "12px",
};

export default Text;
