import React, {Component, Fragment} from 'react';
import Text from "../Text/Text";
import Path from "../Path/Path";
import Line from "../Line/Line";
import * as d3 from "d3";

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
const ThemeContext = React.createContext(colorScale);

class Quadrant extends Component {

    //get theme from global context
    static contextType = ThemeContext;

    constructor(props) {
        super(props);

        const horizonWidth = 0.95* this.props.width / 2;
        const horizon_unit = horizonWidth / this.props.horizons.length;

        this.state = {
            horizonWidth: horizonWidth,
            horizon_unit: horizon_unit
        };

    }

    componentDidMount() {
        this.createRadarGroup();
    }

    createRadarGroup() {

    }

    render() {
        const radialAngle = 2 * Math.PI / 360 * this.props.angle;
        return (
            <Fragment>
                <Line
                    x2={Math.cos(radialAngle * this.props.index) * this.state.horizonWidth}
                    y2={Math.sin(radialAngle * this.props.index) * this.state.horizonWidth}
                    stroke={this.context(this.props.index)}
                />
                <Text
                    name={this.props.name}
                    dx={this.state.horizon_unit}
                    rotationAngle={this.props.index * this.props.angle + this.props.angle}
                    fontSize={this.props.fontSize}
                />
                {this.props.horizons.map((horizonValue, horizonIndex) => {
                    const horizonsLength = this.props.horizons.length;
                    return <Path
                        key={this.props.index + "-" + horizonIndex}
                        quadIndex={this.props.index}
                        horizonIndex={horizonIndex}
                        horizonWidth={this.state.horizonWidth}
                        horizonsLength={horizonsLength}
                        quad_angle={radialAngle}
                        outerRadius={(horizonIndex + 1) / horizonsLength}
                        innerRadius={horizonIndex / horizonsLength}
                    />
                })}
            </Fragment>


        )

    }
}

export default Quadrant;
