import { normalize } from "./FontHelper";
import { colorTheme, ColorThemeNameType } from "./Colors";

const getFonts = (colorThemeName: ColorThemeNameType) => {
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

export const getThemeFont = (colorThemeName: ColorThemeNameType) => (fontName: FontNames) =>
  getFonts(colorThemeName)[fontName];

const fonts = getFonts("light");
export default fonts;
