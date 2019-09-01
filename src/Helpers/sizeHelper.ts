import { PixelRatio } from "react-native";

export const normalize = (size: number) => {
  return Math.round(PixelRatio.roundToNearestPixel(size));
};
