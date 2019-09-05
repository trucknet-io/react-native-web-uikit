import { normalize } from "../Helpers/sizeHelper";
import { getColor, ColorThemeNames } from "./Colors";

export const getFont = (theme: ColorThemeNames) => {
  const color = getColor(theme).defaultText;
  return {
    LargeTitle: {
      fontFamily: "Roboto-Medium",
      fontSize: normalize(24),
      color,
    },
    Title: {
      fontFamily: "Roboto-Medium",
      fontSize: normalize(20),
      color,
    },
    MTitle: {
      fontFamily: "Roboto-Medium",
      fontSize: normalize(18),
      color,
    },
    SubTitle: {
      fontFamily: "Roboto-Regular",
      fontSize: normalize(16),
      color,
    },
    Body: {
      fontFamily: "Roboto-Medium",
      fontSize: normalize(16),
      color,
    },
    BodyRegular: {
      fontFamily: "Roboto-Medium",
      fontSize: normalize(14),
      color,
    },
    BodySmall: {
      fontFamily: "Roboto-Regular",
      fontSize: normalize(12),
      color,
    },
  };
};

export type FontType = ReturnType<typeof getFont>;
export type FontNames = keyof FontType;

const font = getFont("light");
export default font;
