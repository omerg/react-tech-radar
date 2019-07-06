import React, {Component} from 'react';

class Line extends Component {

    constructor(props) {
        super(props);

        //create ref
        this.myRef = React.createRef();

        //create state
        this.state = {}
    }

    componentDidMount() {
        this.createRadarGroup();
    }

    createRadarGroup() {

    }

    render() {
        return (
            <line
                x1="0" y1="0"
                x2={this.props.x2}
                y2={this.props.y2}
                stroke={this.props.stroke}
            >
            </line>
        )

    }
}

export default Line;
