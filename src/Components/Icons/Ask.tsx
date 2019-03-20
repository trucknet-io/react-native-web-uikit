import * as React from "react";
import { Svg, G, Path } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ height, width, color }: iconType) => (
  <Svg width={width || 19} height={height || 23} viewBox="0 0 19 23">
    <G fill="none" fill-rule="evenodd">
      <Path d="M-2-1h24v24H-2z" />
      <Path
        fill={color}
        fill-rule="nonzero"
        d="M9 22.59v-3.6c-5.01-.26-9-4.42-9-9.49C0 4.26 4.26 0 9.5 0S19 4.26 19 9.5c0 4.95-3.44 9.93-8.57 12.4L9 22.59zM9.5 2C5.36 2 2 5.36 2 9.5 2 13.64 5.36 17 9.5 17H11v2.3c3.64-2.3 6-6.08 6-9.8C17 5.36 13.64 2 9.5 2zm-1 11.5h2v2h-2v-2zm2-1.5h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z"
      />
    </G>
  </Svg>
);
