import React, {Component} from 'react';
import * as d3 from "d3";

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
const ThemeContext = React.createContext(colorScale);

class Path extends Component {

    //get theme from global context
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
        const rgb = d3.rgb(this.context(this.props.quadIndex));
        const fill=rgb.brighter(this.props.horizonIndex / this.props.horizonsLength * 3);
        return (
            <path className={"quadrant"}
                d={this.archFunction()()}
                fill={fill}
            >
            </path>
        )

    }

    archFunction = () => {
        return d3.arc()
            .outerRadius(() => {
                return this.props.outerRadius * this.props.horizonWidth;
            })
            .innerRadius(() => {
                return this.props.innerRadius * this.props.horizonWidth;
            })
            .startAngle(() => {
                return this.props.quadIndex * this.props.quad_angle + Math.PI/2;
            })
            .endAngle(() => {
                return (this.props.quadIndex + 1) * this.props.quad_angle + Math.PI/2;
            });
    }
}

export default Path;
