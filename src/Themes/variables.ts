import getShadowStyle from "./getShadowStyle";

import { Platform } from "react-native";
import { normalize } from "../Helpers/sizeHelper";

const sizeBase = Platform.OS === "web" ? 2.3 : 2;

export type WindowSizeType = {
  width: number;
  height: number;
};

const getPoweredSize = (pow: number) => Math.floor(sizeBase ** pow);
const size = {
  xxs: normalize(1),
  xs: getPoweredSize(2),
  s: getPoweredSize(3),
  m: getPoweredSize(4),
  l: getPoweredSize(5),
  xl: getPoweredSize(6),
  xxl: getPoweredSize(7),
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
