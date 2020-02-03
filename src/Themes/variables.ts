import getShadowStyle from "./getShadowStyle";

import { Platform } from "react-native";
import { normalize } from "../Helpers/sizeHelper";

const sizeBase = Platform.OS === "web" ? normalize(2.3) : normalize(2);

export type WindowSizeType = {
  width: number;
  height: number;
};

const size = {
  xxs: normalize(1),
  xs: Math.pow(sizeBase, 2),
  s: Math.pow(sizeBase, 4),
  m: Math.pow(sizeBase, 5),
  l: Math.pow(sizeBase, 6),
  xl: Math.pow(sizeBase, 7),
  xxl: Math.pow(sizeBase, 8),
  xxxl: Math.pow(sizeBase, 9),
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
