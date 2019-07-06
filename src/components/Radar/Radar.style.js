import styled from 'styled-components';

const RadarContents = styled.svg`
    text.name { font-family: Arial, Sans-serif; font-size: 12px; opacity: 0.5 }
`;

const QuadrantGroup = styled.g`   
    line.quadrant { stroke-width: 2px;}
    circle.horizon { stroke: #999; stroke-width: 2px; stroke-opacity: 0; fill: none;}
  
    path.quadrant { fill-opacity: 0.5;}
    text.quadrant {
        font-family: Arial, Sans-serif;
        font-weight: bold;
        color: white;
        opacity: 0.3;
        text-align: right;
`;

export {RadarContents, QuadrantGroup}

