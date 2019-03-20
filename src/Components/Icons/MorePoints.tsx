import * as React from "react";
import { Svg, G, Path } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ width, height, color }: iconType) => {
  return (
    <Svg width={width || 4} height={height || 16} viewBox="0 0 4 16">
      <G fill="none" fillRule="evenodd">
        <Path d="M-10-4h24v24h-24z" />
        <Path
          fill={color}
          fillRule="nonzero"
          d="M2 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2C.9 6 0 6.9 0 8s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        />
      </G>
    </Svg>
  );
};
