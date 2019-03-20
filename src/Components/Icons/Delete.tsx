import * as React from "react";
import { Svg, G, Path } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ color, height, width }: iconType) => (
  <Svg width={width || 14} height={height || 18} viewBox="0 0 14 18">
    <G fill="none" fillRule="evenodd">
      <Path d="M-5-3h24v24H-5z" />
      <Path
        fill={color}
        fillRule="nonzero"
        d="M11 6v10H3V6h8zM9.5 0h-5l-1 1H0v2h14V1h-3.5l-1-1zM13 4H1v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4z"
      />
    </G>
  </Svg>
);
