

# React Tech Radar

A library that generates an interactive radar, inspired by [thoughtworks.com/radar](http://thoughtworks.com/radar).

## Installation

Using [npm](https://www.npmjs.com/):

    npm install --save react-tech-radar

## Quick Start

```jsx
import React from 'react';
import Radar from "./components/Radar/Radar";

function App() {

    const setup = {
        rings: ['adopt', 'trial', 'assess', 'hold'],
        quadrants: ['tools', 'techniques', 'platforms', 'languages'],
        data: [
            {
                name: 'D3',
                quadrant: 'tools',
                ring: "assess"

            },
            {
                name: 'TypeScript',
                quadrant: 'languages',
                ring: "trial"
            },
            {
                name: 'Storybook',
                quadrant: 'tools',
                ring: "adopt"
            }
        ]
    };

    return (
        <div className="App">
            <Radar {...setup} />
        </div>
    );
}

export default App;
```


## Demo

You can see this in action at https://react-tech-radar.netlify.com. If you plug in [this data](https://docs.google.com/spreadsheets/d/1YXkrgV7Y6zShiPeyw4Y5_19QOfu5I6CyH5sGnbkEyiI/) you'll see [this visualization](https://react-tech-radar.netlify.com/?path=/story/radar--with-data-from-google-spreadsheet). 

## License

[MIT](./LICENSE)
