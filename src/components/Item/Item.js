import React, {Component} from 'react';
import {ItemWrapper} from "./Item.style";

class Item extends Component {

    constructor(props) {
        super(props);

        //create ref
        this.ref = React.createRef();

        //create state
        this.state = {}
    }

    componentDidMount() {
    }

    render() {

        return (
            <ItemWrapper
                className="blip"
                id={'blip-' + this.props.data.id}
                transform={"translate(" + (this.props.data.x) + "," + (this.props.data.y) + ")"}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                ref={el => this.ref = el}
            >
                <circle r={"7px"}/>
                <text
                      className={"name"}
                      dy={"20px"}
                >
                    {this.props.data.name}
                </text>
            </ItemWrapper>
        )

    }

    onMouseOver = () => {
        this.ref.style.opacity ='1.0';
    };

    onMouseOut = () => {
        this.ref.style.opacity ='0.7';
    };
}

export default Item;
