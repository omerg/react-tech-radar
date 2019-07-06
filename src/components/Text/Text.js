import React, {Component} from 'react';

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
            <text className={"quadrant"}
                  fontSize={this.props.fontSize}
                  dx={this.props.dx}
                  transform={'rotate(' + this.props.rotationAngle + ')'}
            >
                {this.props.name}
            </text>
        )

    }
}

Text.defaultProps = {
    fontSize: "25px",
};

export default Text;
