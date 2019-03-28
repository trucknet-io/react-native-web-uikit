import * as React from "react";
import { Svg, G, Path } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ height, width, color }: iconType) => {
  return (
    <Svg width={width || 20} height={height || 18} viewBox="0 0 20 18">
      <G fill="none" fillRule="evenodd">
        <Path d="M-2-2h24v24H-2z" />
        <G fill={color} fillRule="nonzero">
          <Path d="M2 2h16v12H3.17L2 15.17V2zm0-2C.9 0 .01.9.01 2L0 20l4-4h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2H2z" />
          <Path d="M4 10h8v2H4zM4 7h12v2H4zM4 4h12v2H4z" />
        </G>
      </G>
    </Svg>
  );
};
