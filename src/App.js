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
        this.getDataFromCache(GOOGLE_SPREADSHEET_LINK);
    }

    getDataFromCache(cacheKey) {

        const cachedData = localStorage.getItem("RADAR_DATA_" + GOOGLE_SPREADSHEET_LINK);

        if (cachedData) {
            this.setState({data: JSON.parse(cachedData)});
            return;
        }

        Tabletop.init({
                key: cacheKey,
                callback: (data, tabletop) => {
                    this.setState({data: data});
                    localStorage.setItem("RADAR_DATA" + GOOGLE_SPREADSHEET_LINK, JSON.stringify(data))
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
