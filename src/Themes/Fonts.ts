import { normalize } from "./FontHelper";
import { colorTheme, ColorThemeName } from "./Colors";

const getFonts = (colorThemeName: ColorThemeName) => {
  const color = colorTheme[colorThemeName].defaultText;
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

type FontType = ReturnType<typeof getFonts>;
export type FontNames = keyof FontType;

export const getThemeFont = (colorThemeName: ColorThemeName) => (fontName: FontNames) =>
  getFonts(colorThemeName)[fontName];

const fonts = getFonts("light");
export default fonts;
