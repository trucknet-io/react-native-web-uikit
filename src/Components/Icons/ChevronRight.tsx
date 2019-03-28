import * as React from "react";
import { Svg, G, Path } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ width, height, color }: iconType) => {
  return (
    <Svg width={width || 8} height={height || 12} viewBox="0 0 8 12">
      <G fill="none" fillRule="evenodd">
        <Path fill={color} d="M.6 1.4L2 0l6 6-6 6-1.4-1.4L5.2 6z" />
        <Path d="M-8-6h24v24H-8z" />
      </G>
    </Svg>
  );
};
