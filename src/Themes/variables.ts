import getShadowStyle from "./getShadowStyle";

import { Platform } from "react-native";
import { normalize } from "../Helpers/sizeHelper";

const sizeBase = Platform.OS === "web" ? 2.3 : 2;

export type WindowSizeType = {
  width: number;
  height: number;
};

export const getZIndex = (size: number = 4) => {
  if (Platform.OS === "android") return { elevation: size };
  return {
    zIndex: 100 * size,
  };
};

const getPoweredSize = (pow: number) => Math.floor(sizeBase ** pow);
const size = {
  xxs: normalize(1) as 1,
  xs: getPoweredSize(2) as 4,
  s: getPoweredSize(3) as 8,
  m: getPoweredSize(4) as 16,
  l: getPoweredSize(5) as 32,
  xl: getPoweredSize(6) as 64,
  xxl: getPoweredSize(7) as 128,
};

const variables = {
  platform: Platform.OS,
  shadow: getShadowStyle(size.xs),
  borderRadius: size.xs,
  borderWidth: size.xxs,
  size,
};

export type VariablesType = typeof variables;
export default variables;
