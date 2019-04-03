import * as React from "react";
import { Svg, G, Path } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ color, width, height }: iconType) => {
  return (
    <Svg height={height || 40} width={width || 40} viewBox="0 0 15 18">
      <G fill="none" fillRule="evenodd">
        <Path
          d="M7.5 18C2.5 14.148 0 10.773 0 7.874 0 3.525 3.358 0 7.5 0 11.642 0 15 3.525 15 7.874c0 2.9-2.5 6.274-7.5 10.126zm0-6.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5z"
          fill={color}
        />
        <Path d="M-5-3h24v24H-5z" />
      </G>
    </Svg>
  );
};
