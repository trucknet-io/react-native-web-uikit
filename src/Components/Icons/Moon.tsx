import * as React from "react";
import { Svg, G, Path } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ height, width, color }: iconType) => (
  <Svg width={width || 15} height={height || 20} viewBox="0 0 15 20">
    <G fill="none" fillRule="evenodd">
      <Path d="M-5-2h24v24H-5z" />
      <Path
        fill={color || "#1F3239"}
        fillRule="nonzero"
        d="M5 2c4.41 0 8 3.59 8 8s-3.59 8-8 8c-.34 0-.68-.02-1.01-.07C5.9 15.77 7 12.95 7 10c0-2.95-1.1-5.77-3.01-7.93C4.32 2.02 4.66 2 5 2zm0-2C3.18 0 1.47.5 0 1.35 2.99 3.08 5 6.3 5 10s-2.01 6.92-5 8.65C1.47 19.5 3.18 20 5 20c5.52 0 10-4.48 10-10S10.52 0 5 0z"
      />
    </G>
  </Svg>
);
