import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup } from "$twind";
export * from "$twind";
import * as colors from "$twind/colors";
export const theme = {
  colors: {
    blue: colors.blue,
    black: colors.black,
    gray: colors.gray,
    green: colors.green,
    white: colors.white,
    yellow: colors.yellow,
    transparent: "transparent",
    turquoise: "#40E0D0",
  },
};
export const config: Configuration = {
  darkMode: "class",
  mode: "silent",
};
if (IS_BROWSER) setup(config);
