export * from "https://raw.githubusercontent.com/lucacasonato/fresh/main/runtime.ts";
import { IS_BROWSER } from "https://raw.githubusercontent.com/lucacasonato/fresh/main/runtime.ts";
import { apply, setup, tw } from "https://esm.sh/twind@0.16.16";
import * as colors from "https://esm.sh/twind@0.16.16/colors";
export * as Typed from "https://esm.sh/typed.js@2.0.12";
export { apply, setup, tw };
export const theme = {
  colors: {
    black: colors.black,
    gray: colors.gray,
    green: colors.green,
    white: colors.white,
    yellow: colors.yellow,
  },
};
if (IS_BROWSER) {
  setup({ theme: { colors } });
}
