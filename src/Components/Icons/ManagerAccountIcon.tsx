import * as React from "react";
import { Svg, Circle, G, Path, Rect } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ width, height, color }: iconType) => (
  <Svg width={width || 50} height={height || 50} viewBox="0 0 50 50">
    <G fill="none" fillRule="evenodd" transform="translate(1 1)">
      <Circle cx="24" cy="24" r="24" stroke={color} />
      <Rect width="23" height="27" x="12.5" y="10.5" stroke={color} rx="2" />
      <Circle cx="16" cy="16" r="1" fill={color} />
      <Circle cx="16" cy="21" r="1" fill={color} />
      <Circle cx="16" cy="26" r="1" fill={color} />
      <Circle cx="16" cy="31" r="1" fill={color} />
      <Path stroke={color} strokeLinecap="square" d="M20 16h12M20 21h12M20 26h12M20 31h12" />
    </G>
  </Svg>
);
