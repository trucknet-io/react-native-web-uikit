import * as React from "react";
import { Svg, Path } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ width, height, color }: iconType) => (
  <Svg width={width || 30} height={height || 15} viewBox="0 0 20 10">
    <Path fill="none" fillRule="nonzero" stroke={color} strokeLinecap="square" strokeWidth="4" d="M1 1h16" />
  </Svg>
);
