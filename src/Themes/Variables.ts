import getShadowStyle from "./Shadow";

import { Dimensions, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { normalize } from "src/Helpers/sizeHelper";

const sizeBase = normalize(2);

type IndentType = {
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

type SizeType = {
  xxs: 1;
  xs: 4;
  s: 16;
  m: 32;
  l: 64;
  xl: 128;
  xxl: 256;
  xxxl: 512;
  xxxxl: 1024;
};

export type WindowSizeType = {
  width: number;
  height: number;
};

export const initialWindowSize = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

const indent = {
  xxs: normalize(1) as IndentType["xxs"],
  xs: sizeBase as IndentType["xs"],
  s: Math.pow(sizeBase, 2) as IndentType["s"],
  m: Math.pow(sizeBase, 3) as IndentType["m"],
  l: Math.pow(sizeBase, 4) as IndentType["l"],
  xl: Math.pow(sizeBase, 5) as IndentType["xl"],
  xxl: Math.pow(sizeBase, 6) as IndentType["xxl"],
  xxxl: Math.pow(sizeBase, 7) as IndentType["xxxl"],
  xxxxl: Math.pow(sizeBase, 8) as IndentType["xxxxl"],
};

const size = {
  xxs: normalize(1) as SizeType["xxs"],
  xs: Math.pow(sizeBase, 2) as SizeType["xs"],
  s: Math.pow(sizeBase, 4) as SizeType["s"],
  m: Math.pow(sizeBase, 5) as SizeType["m"],
  l: Math.pow(sizeBase, 6) as SizeType["l"],
  xl: Math.pow(sizeBase, 7) as SizeType["xl"],
  xxl: Math.pow(sizeBase, 8) as SizeType["xxl"],
  xxxl: Math.pow(sizeBase, 9) as SizeType["xxxl"],
  xxxxl: Math.pow(sizeBase, 10) as SizeType["xxxxl"],
};

const getVariables = (windowSize: WindowSizeType) => {
  return {
    platform: Platform.OS,
    isTablet: DeviceInfo.isTablet(),
    isLandscape: DeviceInfo.isLandscape(),
    shadow: getShadowStyle(size.xs),
    getShadowStyle,
    borderRadius: size.xs,
    borderWidth: size.xxs,
    indent,
    size,
    window: windowSize,
  };
};

export type VariablesType = ReturnType<typeof getVariables>;
export default getVariables;
