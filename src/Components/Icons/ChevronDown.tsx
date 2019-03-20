import * as React from "react";
import { Svg, G, Path } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ width, height, color }: iconType) => {
  return (
    <Svg width={width || 12} height={height || 8} viewBox="0 0 12 8">
      <G fill="none" fillRule="evenodd">
        <Path fill={color} fillRule="nonzero" d="M10.59.59L6 5.17 1.41.59 0 2l6 6 6-6z" />
        <Path d="M-6 16V-8h24v24z" />
      </G>
    </Svg>
  );
};
