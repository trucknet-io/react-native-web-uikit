import * as React from "react";
import { Svg, Path } from "react-native-svg";

export default ({ width, height, color }: { width: number; height: number; color: string }) => (
  <Svg width={width} height={height} viewBox="0 0 34 24">
    <Path
      fill={color}
      fillRule="nonzero"
      d="M1.544 0L0 5.686h5.973L7.486 0l3.34 11.77L1.097 24h6.47l4.933-18.314h6.02L20.069 0z"
    />
  </Svg>
);
