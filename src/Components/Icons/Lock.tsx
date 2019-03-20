import * as React from "react";
import { Svg, G, Path } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ height, width, color }: iconType) => (
  <Svg width={width || 16} height={height || 21} viewBox="0 0 16 21">
    <G fill="none" fill-rule="evenodd">
      <Path d="M-4-1h24v24H-4z" />
      <Path d="M-4-1h24v24H-4z" opacity=".87" />
      <Path
        fill={color || "#1F3239"}
        fill-rule="nonzero"
        // @ts-ignore
        d="M14 7h-1V5c0-2.76-2.24-5-5-5S3 2.24 3 5v2H2C.9 7 0 7.9 0 9v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM5 5c0-1.66 1.34-3 3-3s3 1.34 3 3v2H5V5zm9 14H2V9h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
      />
    </G>
  </Svg>
);
