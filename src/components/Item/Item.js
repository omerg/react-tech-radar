import React, {Component} from 'react';

class Item extends Component {

    constructor(props) {
        super(props);

        //create ref
        this.myText = React.createRef();

        //create state
        this.state = {}
    }

    componentDidMount() {
    }

    render() {

        return (
            <g
                className="blip"
                id={'blip-' + this.props.data.id}
                transform={"translate(" + (this.props.data.x) + "," + (this.props.data.y) + ")"}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
            >
                <circle r={"7px"}/>
                <text ref={el => this.myText = el}
                      className={"name"}
                      dy={"20px"}
                >
                    {this.props.data.name}
                </text>
            </g>
        )

    }

    onMouseOver = () => {
        this.myText.style.opacity ='1.0';
    };

    onMouseOut = () => {
        this.myText.style.opacity ='0.5';
    };
}

export default Item;
