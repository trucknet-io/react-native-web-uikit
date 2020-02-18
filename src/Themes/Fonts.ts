import { normalize } from "../Helpers/sizeHelper";
import { getColors, ColorThemeNames } from "./Colors";

export const getFonts = (theme: ColorThemeNames) => {
  const color = getColors(theme).defaultText;
  return {
    LargeTitle: {
      fontWeight: "bold",
      fontSize: normalize(24),
      color,
    },
    Title: {
      fontWeight: "bold",
      fontSize: normalize(20),
      color,
    },
    MTitle: {
      fontWeight: "bold",
      fontSize: normalize(18),
      color,
    },
    SubTitle: {
      fontWeight: "400",
      fontSize: normalize(16),
      color,
    },
    Body: {
      fontWeight: "400",
      fontSize: normalize(16),
      color,
    },
    BodyRegular: {
      fontWeight: "400",
      fontSize: normalize(14),
      color,
    },
    BodySmall: {
      fontWeight: "300",
      fontSize: normalize(12),
      color,
    },
  } as const;
};

export type FontType = ReturnType<typeof getFonts>;
export type FontNames = keyof FontType;

const fonts = getFonts("light");
export default fonts;
