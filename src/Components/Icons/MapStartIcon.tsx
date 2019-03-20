import * as React from "react";
import { Svg, Circle, G } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ width, height, color }: iconType) => {
  return (
    <Svg height={height || 40} width={width || 40} viewBox="0 0 25 38">
      <G fill={color || "#2CCE62"} fillRule="evenodd">
        <Circle cx="12" cy="12" r="12" opacity=".15" />
        <Circle cx="12" cy="12" r="7.333" opacity=".25" />
        <Circle cx="12" cy="12" r="2.667" />
      </G>
    </Svg>
  );
};
