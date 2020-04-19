import * as React from "react";
import { Svg, Path, G } from "react-native-svg";
import { iconType } from "./iconType";

const TriangleUp = ({ width, height, color }: iconType) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 10 5">
      <G fill="none" fillRule="evenodd">
        <Path fill={color} fill-rule="nonzero" d="M0 5l5-5 5 5z" />
        <Path d="M-7 15h24V-9H-7z" />
      </G>
    </Svg>
  );
};

TriangleUp.defaultProps = {
  width: 12,
  height: 12,
};

export default TriangleUp;
