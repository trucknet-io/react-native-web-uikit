import getShadowStyle from "./Shadow";

import { Dimensions, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { normalize } from "../Helpers/sizeHelper";

const sizeBase = normalize(2);
type SizeType = {
  xs: 2;
  s: 4;
  m: 8;
  l: 16;
  xl: 32;
  xxl: 64;
  xxxl: 128;
};

const getVariables = (dimensions: Dimensions) => {
  let screenWidth = dimensions.get("screen").width;
  let screenHeight = dimensions.get("screen").height;
  return {
    platform: Platform.OS,
    isTablet: DeviceInfo.isTablet(),
    isLandscape: DeviceInfo.isLandscape(),
    deviceType: DeviceInfo.getDeviceType(),
    shadow: getShadowStyle(normalize(4)),
    getShadowStyle,
    borderRadius: normalize(4),
    borderWidth: normalize(1),
    size: {
      xs: sizeBase as SizeType["xs"],
      s: Math.pow(sizeBase, 2) as SizeType["s"],
      m: Math.pow(sizeBase, 3) as SizeType["m"],
      l: Math.pow(sizeBase, 4) as SizeType["l"],
      xl: Math.pow(sizeBase, 5) as SizeType["xl"],
      xxl: Math.pow(sizeBase, 6) as SizeType["xxl"],
      xxxl: Math.pow(sizeBase, 7) as SizeType["xxxl"],
    },
    dimensions,
    screenWidth,
    screenHeight,
  };
};

export type GetVariablesType = ReturnType<typeof getVariables>;
export default getVariables;
