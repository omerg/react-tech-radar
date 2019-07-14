import * as React from "react";
import * as d3 from "d3";

export const colorScales = [
    { "name" : "schemeCategory10"},
    { "name" : "schemeAccent"},
    { "name" : "schemeDark2"},
    { "name" : "schemePaired"},
    { "name" : "schemeSet1"},
    { "name" : "schemeSet2"},
    { "name" : "schemeSet3"}
];

//set color scheme by index
//chose from 0 to 6
const colorSchemeIndex = 5;

export const colorScale = d3.scaleOrdinal(d3[colorScales[colorSchemeIndex].name]);

export const ThemeContext = React.createContext(
    colorScale
);
