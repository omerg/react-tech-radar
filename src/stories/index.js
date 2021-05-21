import React from 'react';

import {storiesOf} from '@storybook/react';
import Radar from "../components/Radar/Radar";
import GoogleSpreadSheetDemo from "../../examples/google-spreadsheet/GoogleSpreadsheetDemo";

storiesOf('Basics', module)
    .add('with minimum setup', () => {

        const setup = {
            rings: ['discover', 'learn', 'use'],
            quadrants: ['languages', 'frameworks', 'tools', 'libraries'],
            data: [
                {
                    name: 'D3',
                    quadrant: 'libraries',
                    ring: "learn"
                },
                {
                    name: 'TypeScript',
                    quadrant: 'languages',
                    ring: "learn"
                },
                {
                    name: 'Storybook',
                    quadrant: 'tools',
                    ring: "use"
                }
            ]
        };
        return (
            <Radar
                rings={setup.rings}
                quadrants={setup.quadrants}
                data={setup.data}/>
        )
    })
    .add('with 5 quadrants', () => {

        const setup = {

            rings: ['adopt', 'trial', 'assess', 'hold'],
            quadrants: ['tools', 'techniques', 'platforms', 'languages', 'frameworks'],
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
            <Radar
                width={setup.width}
                rings={setup.rings}
                quadrants={setup.quadrants}
                data={setup.data}
            />
        )
    })
    .add('with data from Google SpreadSheet', () => {
        return <GoogleSpreadSheetDemo/>
    })
    .add('with custom font size and font family', () => {

    const state = {
        rings: ['adopt', 'trial', 'assess', 'hold'],
        quadrants: ['tools', 'techniques', 'platforms', 'languages'],
        width: 550,
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
        <Radar
            width={state.width}
            rings={state.rings}
            quadrants={state.quadrants}
            data={state.data}
            fontSize={18}
            itemFontSize={12}
            fontFamily={"fantasy"}/>
    )})
        .add('with custom margin', () => {

    const state = {
        rings: ['adopt', 'trial', 'assess', 'hold'],
        quadrants: ['tools', 'techniques', 'platforms', 'languages'],
        width: 550,
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
        <Radar
            margin={10}
            width={state.width}
            rings={state.rings}
            quadrants={state.quadrants}
            data={state.data}
            fontFamily={"fantasy"}/>
    )
}).add('with labels only on the first rim', () => {

    const state = {
        rings: ['adopt', 'trial', 'assess', 'hold'],
        quadrants: ['tools', 'techniques', 'platforms', 'languages'],
        width: 550,
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
        <Radar
            margin={10}
            width={state.width}
            rings={state.rings}
            quadrants={state.quadrants}
            data={state.data}
            quadrantsConfig={{
                showOnlyFirstQuadrantLabels : true
            }}
            fontFamily={"fantasy"}/>
    )
})
.add('with labels only on the first rim and a y offset on the label', () => {

    const state = {
        rings: ['adopt', 'trial', 'assess', 'hold'],
        quadrants: ['tools', 'techniques', 'platforms', 'languages'],
        width: 550,
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
        <Radar
            margin={10}
            width={state.width}
            rings={state.rings}
            quadrants={state.quadrants}
            data={state.data}
            quadrantsConfig={{
                showOnlyFirstQuadrantLabels : true,
                textYOffset : -5
            }}
            fontFamily={"fantasy"}/>
    )
})
.add('with  a custom text margin', () => {

    const state = {
        rings: ['adopt', 'trial', 'assess', 'hold'],
        quadrants: ['tools', 'techniques', 'platforms', 'languages'],
        width: 550,
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
        <Radar
            margin={10}
            width={state.width}
            rings={state.rings}
            quadrants={state.quadrants}
            data={state.data}
            quadrantsConfig={{
                showOnlyFirstQuadrantLabels : true,
                textMargin : 0,
                textYOffset : -5


            }}
            fontFamily={"fantasy"}/>
    )
})


const colorSchemeStoryHandler = (schemeIndex) => () => {

    const setup = {

        rings: ['adopt', 'trial', 'assess', 'hold'],
        quadrants: ['tools', 'techniques', 'platforms', 'languages', 'frameworks', "methodologies"],
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
        ],
        colorScaleIndex: schemeIndex
    };
    return (
        <Radar
            width={setup.width}
            rings={setup.rings}
            quadrants={setup.quadrants}
            data={setup.data}
            colorScaleIndex={setup.colorScaleIndex}
        />
    )
};

storiesOf('Color Schemes', module)
    .add('with 1', colorSchemeStoryHandler(1))
    .add('with 2', colorSchemeStoryHandler(2))
    .add('with 3', colorSchemeStoryHandler(3))
    .add('with 4', colorSchemeStoryHandler(4))
    .add('with 5', colorSchemeStoryHandler(5))
    .add('with 6', colorSchemeStoryHandler(6));

storiesOf('Edge Cases', module)
    .add('without rings', () => {

        let state = {
            quadrants: ['tools', 'techniques', 'platforms', 'languages'],
            data: [
                {
                    name: 'D3',
                    quadrant: 'tools'

                },
                {
                    name: 'TypeScript',
                    quadrant: 'languages'
                },
                {
                    name: 'Storybook',
                    quadrant: 'tools'
                }
            ]
        };
        return (
            <Radar
                quadrants={state.quadrants}
                dataUrl={state.dataUrl}/>
        )
    })
    .add('with no data provided', () => {

    const setup = {
        rings: ['adopt', 'trial', 'assess', 'hold'],
        quadrants: ['tools', 'techniques', 'platforms', 'language-and-frameworks'],
    };
    return (
        <Radar
            width={setup.width}
            rings={setup.rings}
            quadrants={setup.quadrants}/>
    )
});
