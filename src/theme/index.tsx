import { createTheme as createMuiTheme } from "@mui/material/styles";
import { baseThemeOptions } from "./base-theme-options";

import type {} from "@mui/lab/themeAugmentation";
// When using TypeScript 3.x and below
import "@mui/lab/themeAugmentation";
import { lightThemeOptions } from "./light-theme-options";
export const createTheme = (config: { direction: string }) => {
  let theme = createMuiTheme(baseThemeOptions, lightThemeOptions, {
    direction: config.direction,
  });

  return theme;
};
