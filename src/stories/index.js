import React from 'react';

import {storiesOf} from '@storybook/react';
import Radar from "../components/Radar/Radar";

storiesOf('Radar', module)
    .add('with 5 quadrants', () => {

        const state = {

            rings: ['adopt', 'trial', 'assess', 'hold'],
            quadrants: ['tools', 'techniques', 'platforms', 'languages', 'frameworks'],
            data: [
                {
                    name: 'D3',
                    description: 'The d3 library for producing visualisation and data driven documents',
                    links: ['http://d3js.org'],
                    quadrant: 'tools',
                    ring: "adopt"

                },
                {
                    name: 'TypeScript',
                    description: 'The d3 library for producing visualisation and data driven documents',
                    links: ['http://d3js.org'],
                    quadrant: 'languages',
                    ring: "trial"
                }
            ]
        };
        return (
            <Radar
                width={state.width}
                rings={state.rings}
                quadrants={state.quadrants}
                data={state.data}
            />
        )
    })
    .add('with 3 rings', () => {

        let state = {

            rings: ['discover', 'learn', 'use'],
            quadrants: ['languages', 'frameworks', 'tools', 'big data'],
            data: [
                {
                    name: 'Angular 8',
                    description: 'The d3 library for producing visualisation and data driven documents',
                    links: ['http://d3js.org'],
                    quadrant: 'frameworks',
                    ring: "use"

                },
                {
                    name: 'Rust',
                    description: 'The d3 library for producing visualisation and data driven documents',
                    links: ['http://d3js.org'],
                    quadrant: 'languages',
                    ring: "learn"
                }
            ]
        };
        return (
            <Radar
                width={state.width}
                rings={state.rings}
                quadrants={state.quadrants}
                data={state.data}/>
        )
    })
    .add('with data from Google SpreadSheet', () => {

        const GOOGLE_SPREADSHEET_LINK = "https://docs.google.com/spreadsheets/d/1vmXx5CFxek3UUgJ-2WnYJC8tpLBvcBuz9ylFjyN0qQA/edit";

        let state = {
            rings: ['adopt', 'trial', 'assess', 'hold'],
            quadrants: ['tools', 'techniques', 'platforms', 'language-and-frameworks'],
            dataUrl: GOOGLE_SPREADSHEET_LINK
        };
        return (
            <Radar
                width={state.width}
                rings={state.rings}
                quadrants={state.quadrants}
                dataUrl={state.dataUrl}/>
        )
    })
    .add('with no data provided', () => {

        let state = {
            rings: ['adopt', 'trial', 'assess', 'hold'],
            quadrants: ['tools', 'techniques', 'platforms', 'language-and-frameworks'],
        };
        return (
            <Radar
                width={state.width}
                rings={state.rings}
                quadrants={state.quadrants}/>
        )
    })
    .add('with custom font size and font family', () => {

        const GOOGLE_SPREADSHEET_LINK = "https://docs.google.com/spreadsheets/d/1vmXx5CFxek3UUgJ-2WnYJC8tpLBvcBuz9ylFjyN0qQA/edit";

        let state = {
            rings: ['adopt', 'trial', 'assess', 'hold'],
            quadrants: ['tools', 'techniques', 'platforms', 'language-and-frameworks'],
            width: 800,
            dataUrl: GOOGLE_SPREADSHEET_LINK
        };
        return (
            <Radar
                width={state.width}
                rings={state.rings}
                quadrants={state.quadrants}
                dataUrl={state.dataUrl}
                fontSize={18}
                fontFamily={"fantasy"}/>
        )
    })
    .add('without rings', () => {

    const GOOGLE_SPREADSHEET_LINK = "https://docs.google.com/spreadsheets/d/1vmXx5CFxek3UUgJ-2WnYJC8tpLBvcBuz9ylFjyN0qQA/edit";

    let state = {
        quadrants: ['tools', 'techniques', 'platforms', 'language-and-frameworks'],
        dataUrl: GOOGLE_SPREADSHEET_LINK
    };
    return (
        <Radar
            quadrants={state.quadrants}
            dataUrl={state.dataUrl}/>
    )
});

