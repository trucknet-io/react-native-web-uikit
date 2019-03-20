import * as React from "react";
import { Svg, G, Path } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ width, height, color }: iconType) => (
  <Svg width={width || 20} height={height || 16} viewBox="0 0 20 16">
    <G fill="none" fill-rule="evenodd">
      <Path d="M-2-4h24v24H-2z" />
      <Path
        fill={color}
        fill-rule="nonzero"
        d="M20 2c0-1.1-.9-2-2-2H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V2zm-2 0l-8 4.99L2 2h16zm0 12H2V4l8 5 8-5v10z"
      />
    </G>
  </Svg>
);
