import React, {Component} from 'react';
import {ItemWrapper} from "./Item.style";

const MAX_LENGTH = 15;

class Item extends Component {

    constructor(props) {
        super(props);

        //create ref
        this.ref = React.createRef();

        this.shortName = this.props.data.name.length > MAX_LENGTH ?
            this.props.data.name.substr(0, MAX_LENGTH) + "..." :
            this.props.data.name;

        //create state
        this.state = {
            name: this.shortName
        }
    }

    componentDidMount() {
    }

    render() {

        return (
            <ItemWrapper
                className="blip"
                id={'blip-' + this.props.data.id}
                transform={" rotate(" + this.props.rotateDegrees + ") translate(" + (this.props.data.x) + "," + (this.props.data.y) + ")"}
                onMouseEnter={this.onMouseOver}
                onMouseLeave={this.onMouseOut}
                ref={el => this.ref = el}

            >
                <circle r={"4px"}/>

                <text
                      className={"name"}
                      dx={"7px"}
                      dy={"7px"}
                      fontSize={this.context.fontSize}
                      fontFamily={this.context.fontFamily}

                >
                    {this.state.name}
                </text>
            </ItemWrapper>
        )

    }

    onMouseOver = () => {
        this.ref.style.opacity ='1.0';
        this.ref.style.fontWeight = "Bold";
        this.setState({
            name: this.props.data.name
        })
    };

    onMouseOut = () => {
        this.ref.style.opacity ='0.7';
        this.ref.style.fontWeight = "Normal";
        this.setState({
            name: this.shortName
        })
    };
}

export default Item;
