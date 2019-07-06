import React from 'react';
import Radar from "./components/Radar/Radar";

class App extends React.Component {

  state = {

    horizons: ['adopt', 'trial', 'assess', 'hold'],
    quadrants: ['tools', 'techniques', 'platforms', 'languages & frameworks'],
    width: 850,
    data: [
      {
        name: 'd3',
        description: 'The d3 library for producing visualisation and data driven documents',
        links: ['http://d3js.org'],
        quadrant: 'frameworks',
        horizon: "assess"

      },
      {
        name: 'd4',
        description: 'The d3 library for producing visualisation and data driven documents',
        links: ['http://d3js.org'],
        quadrant: 'languages',
        horizon: "learn"
      }
    ]
  };

  render() {
    return (
        <div className="App">
          <Radar
              width={this.state.width}
              height={this.state.height}
              horizons={this.state.horizons}
              quadrants={this.state.quadrants}
              data={this.state.data}/>
        </div>
    );
  }

}

export default App;
