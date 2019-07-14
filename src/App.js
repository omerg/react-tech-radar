import React from 'react';
import Radar from "./components/Radar/Radar";
import * as Tabletop from "tabletop";
import {colorScale, ThemeContext} from './theme-context';

const GOOGLE_SPREADSHEET_LINK = "https://docs.google.com/spreadsheets/d/1vmXx5CFxek3UUgJ-2WnYJC8tpLBvcBuz9ylFjyN0qQA/edit";

class App extends React.Component {

  state = {

    rings: ['adopt', 'trial', 'assess', 'hold'],
    quadrants: ['tools', 'techniques', 'platforms', 'language-and-frameworks'],
    width: 850,
    data: []
  };

  componentDidMount() {

    Tabletop.init({
          key: GOOGLE_SPREADSHEET_LINK,
          callback: (data, tabletop) => {
            this.setState({data: data})
          },
          simpleSheet: true
        }
    )
  }

    render() {
        return (
            <ThemeContext.Provider value={colorScale}>
                <div className="App">
                    <Radar
                        width={this.state.width}
                        height={this.state.height}
                        rings={this.state.rings}
                        quadrants={this.state.quadrants}
                        data={this.state.data}
                        fontSize={12}/>
                </div>
            </ThemeContext.Provider>
        );
    }

}

export default App;
