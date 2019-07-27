import React, {Component} from 'react';
import * as d3 from "d3";
import {ThemeContext} from "../theme-context";

class Path extends Component {

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
        const fill = rgb.brighter(this.props.ringIndex / this.props.ringsLength * 0.9);
        const uniquePathId = this.props.quadIndex + "-" + this.props.ringIndex;

        return (
            <g>
                <path id={uniquePathId} className={"quadrant"}
                      d={this.archFunction()()}
                      fill={fill}
                >
                </path>

                {this.props.title &&
                <text
                    dx={this.props.ringWidth / 2 }
                >
                    <textPath href={'#' + uniquePathId}>
                        {this.props.title}
                    </textPath>
                </text>
                }
            </g>
        )

    }

    archFunction = () => {
        return d3.arc()
            .outerRadius(() => {
                return this.props.outerRadius * this.props.ringWidth;
            })
            .innerRadius(() => {
                return this.props.innerRadius * this.props.ringWidth;
            })
            .startAngle(() => {
                return Math.PI/2;
            })
            .endAngle(() => {
                return this.props.quad_angle + Math.PI/2;
            });
    }
}

Path.contextType = ThemeContext;
export default Path;
