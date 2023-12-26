// Colors

interface Neutral {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  1000: string;
  1100: string;
  1200: string;
  1300: string;
  1400: string;
  1500: string;
  1600: string;
  1700: string;
  1800: string;
}
const neutral: Neutral = {
  100: "#FFFFFF",
  200: "#F3F4F5",
  300: "#D1D5DB",
  400: "#758590",
  500: "#6B7280",
  600: "#4B5864",
  700: "#374151",
  800: "#1F2937",
  900: "#212B36",
  1000: "#000000",
  1100: "#FBFBFB",
  1200: "#4B566B",
  1300: "#EF78224D",
  1400: "rgba(255, 255, 255, 0.8)",
  1500: "rgba(239, 120, 34, 0.6)",
  1600: "#FFEBDD",
  1700: "#fff5cf",
  1800: "#FFFFFF",
};

interface Table {
  background: string;
  textColor: string;
}
const table: Table = {
  background: "#F8F8FA",
  textColor: "#031C3A",
};
export const paperBoxShadow: string = "#E5EAF1";
const sectionBg: string = "#F5F6F8";
// const footerTopBg = '#3e4655'
const footerTopBgColor: string = "#00000050";
const footerCenterBg: string = "#2f3645";
const footerMiddleBg: string = "#343c4d";
const nonVeg: string = "#EE7878";
const cardBackground1: string = "#FFFFFF";
const cardBackground2: string = "#FFFFFF";

const borderBottomBg: string = "#D1D5DB";
const navbarBg: string = "#fff";
const footerTopBg: string = neutral[1500];

interface Background {
  default: string;
  paper: string;
  buttonBackground: string;
  profileBackground: string;
  main: string;
}
const background: Background = {
  default: "#F0F8FF",
  paper: "#F3F6FF",
  buttonBackground: "rgba(82, 102, 208, 0.05)",
  profileBackground: "#FBFBFB",
  main: "#7d7c7c54",
};
const newsletterBG = "#2287FD";

const divider: string = "#E6E8F0";
// main: '#EF7822',
// secondary main: '#ff903f',

// "#FF7918"

interface Primary {
  main: string;
  light: string;

  dark: string;

  text?: string;
  contrastText?: string;
}
const primary: Primary = {
  main: "#329CD7", // '#FF7918'
  // light: 'rgba(255, 121, 24, 0.8)',
  light: "#EBEFFD",

  dark: "#F6FCFF",

  text: "#FFC72D",
};
const searchBoxBg = primary.main;
const secondary: Primary = {
  main: "#934916",
  light: "#fafaf9",
  dark: "#a2684c",
  contrastText: "#9EA5AB",
};

interface Info {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}
const info: Info = {
  main: "#2196F3",
  light: "#64B6F7",
  dark: "#0B79D0",
  contrastText: "#FFFFFF",
};

interface Error {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
  info: string;
  back: string;
  whiteText: string;
  pureRed: string;
}
const error: Error = {
  main: "#FF686A",
  light: "#DA6868",
  dark: "#922E2E",
  contrastText: "#FFFFFF",
  info: "#FCECD3",
  back: "#FFE1E2",
  whiteText: "#FFFFFF",
  pureRed: "#DB3022",
};
 
 export interface LightThemeOptions {
  typography: {
    allVariants: {
      fontFamily: string;
      textTransform: string;
    };
  };
  shadows: string[];
  palette: {
    background: Background;

    paperBoxShadow: string;
    divider: string;
    error: Error;
    info: Info;
    mode: string;
    neutral: Neutral;
    table: Table;
    primary: Primary;
    secondary: Primary;
  };
}
export const lightThemeOptions: LightThemeOptions = {
  typography: {
    allVariants: {
      fontFamily: "Inter",
      textTransform: "none",
    },
  },

  palette: {
    paperBoxShadow,
    background,
    divider,
    error,
    info,

    mode: "light",
    neutral,
    table,
    primary,
    secondary,
  },

  shadows: [
    "none",
    "0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)",
    "0px 1px 2px rgba(100, 116, 139, 0.12)",
    "0px 1px 4px rgba(100, 116, 139, 0.12)",
    "0px 1px 5px rgba(100, 116, 139, 0.12)",
    "0px 1px 6px rgba(100, 116, 139, 0.12)",
    "0px 2px 6px rgba(100, 116, 139, 0.12)",
    "0px 3px 6px rgba(100, 116, 139, 0.12)",
    "0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)",
    "0px 5px 12px rgba(100, 116, 139, 0.12)",
    "0px 5px 14px rgba(100, 116, 139, 0.12)",
    "0px 5px 15px rgba(100, 116, 139, 0.12)",
    "0px 6px 15px rgba(100, 116, 139, 0.12)",
    "0px 7px 15px rgba(100, 116, 139, 0.12)",
    "0px 8px 15px rgba(100, 116, 139, 0.12)",
    "0px 9px 15px rgba(100, 116, 139, 0.12)",
    "0px 10px 15px rgba(100, 116, 139, 0.12)",
    "0px 12px 22px -8px rgba(100, 116, 139, 0.25)",
    "0px 13px 22px -8px rgba(100, 116, 139, 0.25)",
    "0px 14px 24px -8px rgba(100, 116, 139, 0.25)",
    "0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
  ],
};
