import * as React from "react";
import { Svg, G, Path, Circle } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ height, width, color }: iconType) => {
  return (
    <Svg width={width || 20} height={height || 18} viewBox="0 0 20 20">
      <G fill="none" fill-rule="evenodd">
        <Path d="M-5-2h24v24H-5z" />
        <G fill={color} fill-rule="nonzero">
          <Path d="M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM2 7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C4.92 14.21 2 9.85 2 7z" />
          <Circle cx="7" cy="7" r="2.5" />
        </G>
      </G>
    </Svg>
  );
};
