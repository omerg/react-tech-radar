import React from 'react';
import Radar from "./components/Radar/Radar";

const GOOGLE_SPREADSHEET_LINK = "https://docs.google.com/spreadsheets/d/1vmXx5CFxek3UUgJ-2WnYJC8tpLBvcBuz9ylFjyN0qQA/edit";

function App() {

    const setup = {
        rings: ['adopt', 'trial', 'assess', 'hold'],
        quadrants: ['tools', 'techniques', 'platforms', 'language-and-frameworks'],
        dataUrl: GOOGLE_SPREADSHEET_LINK
    };

    return (
        <div className="App">
            <Radar {...setup} />
        </div>
    );
}

export default App;
