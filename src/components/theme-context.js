import * as React from "react";
import {scaleOrdinal} from "d3-scale";
import * as d3Scales from 'd3-scale-chromatic'

export const colorScales = [
    {"name": "schemeCategory10"},
    {"name": "schemeAccent"},
    {"name": "schemeDark2"},
    {"name": "schemePaired"},
    {"name": "schemeSet1"},
    {"name": "schemeSet2"},
    {"name": "schemeSet3"}
];

//set color scheme by index
//chose from 0 to 6
const DEFAULT_COLOR_SCHEME_INDEX = 5;
const DEFAULT_FONT_SIZE = 12;
const DEFAULT_COLOR_SCALE = getColorScale(5);
const DEFAULT_FONT_FAMILY = "Arial, Helvetica, sans-serif";

export function getColorScale(colorScaleIndex) {

    if (colorScaleIndex < 0 || colorScaleIndex >= colorScales.length) {
        console.warn("Unsupported color scheme. Please choose between 0 and " + (colorScales.length - 1));
        return DEFAULT_COLOR_SCHEME_INDEX;
    }

    return scaleOrdinal(d3Scales[colorScales[colorScaleIndex].name]);
}

export const ThemeContext = React.createContext({
    colorScale: DEFAULT_COLOR_SCALE,
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: DEFAULT_FONT_SIZE,
    itemFontSize: DEFAULT_FONT_SIZE,
    quadrantsConfig : {}
});
