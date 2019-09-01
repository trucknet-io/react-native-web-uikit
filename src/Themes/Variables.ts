import getShadowStyle from "./Shadow";

import { Dimensions, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { normalize } from "../Helpers/sizeHelper";

const sizeBase = normalize(2);
type SizeType = {
  xxs: 1;
  xs: 2;
  s: 4;
  m: 8;
  l: 16;
  xl: 32;
  xxl: 64;
  xxxl: 128;
  xxxxl: 256;
};

export type WindowSizeType = {
  width: number;
  height: number;
};

export const initialWindowSize = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

const size = {
  xxs: normalize(1),
  xs: sizeBase as SizeType["xs"],
  s: Math.pow(sizeBase, 2) as SizeType["s"],
  m: Math.pow(sizeBase, 3) as SizeType["m"],
  l: Math.pow(sizeBase, 4) as SizeType["l"],
  xl: Math.pow(sizeBase, 5) as SizeType["xl"],
  xxl: Math.pow(sizeBase, 6) as SizeType["xxl"],
  xxxl: Math.pow(sizeBase, 7) as SizeType["xxxl"],
  xxxxl: Math.pow(sizeBase, 8) as SizeType["xxxxl"],
};

const getVariables = (windowSize: WindowSizeType) => {
  return {
    platform: Platform.OS,
    isTablet: DeviceInfo.isTablet(),
    isLandscape: DeviceInfo.isLandscape(),
    deviceType: DeviceInfo.getDeviceType(),
    shadow: getShadowStyle(size.s),
    getShadowStyle,
    borderRadius: size.s,
    borderWidth: size.xxs,
    size,
    window: windowSize,
  };
};

export type GetVariablesType = ReturnType<typeof getVariables>;
export default getVariables;
