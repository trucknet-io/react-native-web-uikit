import * as React from "react";
import { Svg, Path, G } from "react-native-svg";
import { iconType } from "./iconType";

const TriangleDown = ({ width, height, color }: iconType) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 10 5">
      <G fill="none" fillRule="evenodd">
        <Path fill={color} fillRule="nonzero" d="M0 0l5 5 5-5z" />
        <Path d="M-7-10h24v24H-7z" />
      </G>
    </Svg>
  );
};

TriangleDown.defaultProps = {
  width: 12,
  height: 12,
};

export default TriangleDown;
