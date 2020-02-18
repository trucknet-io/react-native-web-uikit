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
  s: Math.pow(sizeBase, 3),
  m: Math.pow(sizeBase, 4),
  l: Math.pow(sizeBase, 5),
  xl: Math.pow(sizeBase, 6),
  xxl: Math.pow(sizeBase, 7),
  xxxl: Math.pow(sizeBase, 8),
  /**
   * We have 7 days, all days aligned in the center, otherwise
   * we' ll have a problem with the right or left side. So 100 / 7 / 2 = ~7.14
   * With 7.14% padding content began right in the center of 1st day
   * but we need it began lefter & end righter so 6% is really good for calendar horizontal padding.
   */
  calendarPaddingHorizontal: "6%",
} as const;

const variables = {
  platform: Platform.OS,
  shadow: getShadowStyle(size.xs),
  borderRadius: size.xs,
  borderWidth: size.xxs,
  size,
};

export type VariablesType = typeof variables;
export default variables;
