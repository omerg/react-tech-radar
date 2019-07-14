import React from 'react';
import Radar from "./components/Radar/Radar";

const GOOGLE_SPREADSHEET_LINK = "https://docs.google.com/spreadsheets/d/1vmXx5CFxek3UUgJ-2WnYJC8tpLBvcBuz9ylFjyN0qQA/edit";

class App extends React.Component {

    state = {
        rings: ['adopt', 'trial', 'assess', 'hold'],
        quadrants: ['tools', 'techniques', 'platforms', 'language-and-frameworks'],
        width: 850,
        data: []
    };

    render() {
        return (
            <div className="App">
                <Radar
                    width={this.state.width}
                    rings={this.state.rings}
                    quadrants={this.state.quadrants}
                    dataUrl={GOOGLE_SPREADSHEET_LINK}
                />
            </div>
        );
    }

}

export default App;
