import Radar from "../components/Radar/Radar";
import GoogleSpreadSheetDemo from "../../examples/google-spreadsheet/GoogleSpreadsheetDemo";

const metadata = {
  title: "Radar",
  component: Radar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export const WithMinimumSetup = {
  args: {
    rings: ["discover", "learn", "use"],
    quadrants: ["languages", "frameworks", "tools", "libraries"],
    data: [
      {
        name: "D3",
        quadrant: "libraries",
        ring: "learn",
      },
      {
        name: "TypeScript",
        quadrant: "languages",
        ring: "learn",
      },
      {
        name: "Storybook",
        quadrant: "tools",
        ring: "use",
      },
    ],
  },
};

export const WithFiveQuadrants = {
  args: {
    rings: ["adopt", "trial", "assess", "hold"],
    quadrants: ["tools", "techniques", "platforms", "languages", "frameworks"],
    data: [
      {
        name: "D3",
        quadrant: "tools",
        ring: "assess",
      },
      {
        name: "TypeScript",
        quadrant: "languages",
        ring: "trial",
      },
      {
        name: "Storybook",
        quadrant: "tools",
        ring: "adopt",
      },
    ],
  },
};

export const WithDataFromGoogleSpreadSheets = () => {
  return <GoogleSpreadSheetDemo />;
};

export const WithCustomFontSizeAndFontFamily = {
  args: {
    rings: ["adopt", "trial", "assess", "hold"],
    quadrants: ["tools", "techniques", "platforms", "languages"],
    data: [
      {
        name: "D3",
        quadrant: "tools",
        ring: "assess",
      },
      {
        name: "TypeScript",
        quadrant: "languages",
        ring: "trial",
      },
      {
        name: "Storybook",
        quadrant: "tools",
        ring: "adopt",
      },
    ],
    fontSize: 18,
    itemFontSize: 12,
    fontFamily: "fantasy",
  },
};

export default metadata;
