import * as React from "react";
import { Svg, Circle } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ width, height, color }: iconType) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 6 6">
      <Circle cx="19" cy="19" r="3" fill={color} fillRule="evenodd" transform="translate(-16 -16)" />
    </Svg>
  );
};
