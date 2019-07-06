import React from 'react';

import {storiesOf} from '@storybook/react';
import Radar from "../components/Radar/Radar";

storiesOf('Radar', module)
    .add('with 4 quadrants', () => {

        const state = {

            horizons: ['adopt', 'trial', 'assess', 'hold'],
            quadrants: ['tools', 'techniques', 'platforms', 'languages & frameworks'],
            width: 380,
            data: [
                {
                    name: 'd3',
                    description: 'The d3 library for producing visualisation and data driven documents',
                    links: ['http://d3js.org'],
                    quadrant: 'frameworks',
                    horizon: "adopt"

                },
                {
                    name: 'typeScript',
                    description: 'The d3 library for producing visualisation and data driven documents',
                    links: ['http://d3js.org'],
                    quadrant: 'languages & frameworks',
                    horizon: "trial"
                }
            ]
        };
            return (
                <Radar
                    width={state.width}
                    horizons={state.horizons}
                    quadrants={state.quadrants}
                    data={state.data}
                    fontSize={"20px"}
                />
            )
        }
    )
    .add('with 5 quadrants', () => {

            let state = {

                horizons: ['discover', 'learn', 'use'],
                quadrants: ['languages', 'frameworks', 'tools', 'big data', "java"],
                width: 380,
                data: [
                    {
                        name: 'd3',
                        description: 'The d3 library for producing visualisation and data driven documents',
                        links: ['http://d3js.org'],
                        quadrant: 'frameworks',
                        horizon: "use"

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
            return (
                <Radar
                    width={state.width}
                    horizons={state.horizons}
                    quadrants={state.quadrants}
                    data={state.data}/>
            )
        }
    );

