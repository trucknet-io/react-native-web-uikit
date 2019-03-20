import * as React from "react";
import { Svg, G, Path } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ height, width, color }: iconType) => {
  return (
    <Svg width={width || 20} height={height || 18} viewBox="0 0 20 18">
      <G fill="none" fill-rule="evenodd">
        <Path d="M-3-3h24v24H-3z" />
        <G fill={color} fill-rule="nonzero">
          <Path d="M8 4h6v2H8zM8 8h6v2H8zM8 12h6v2H8zM4 4h2v2H4zM4 8h2v2H4zM4 12h2v2H4z" />
          <Path d="M17.1 0H.9C.4 0 0 .4 0 .9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V.9c0-.5-.5-.9-.9-.9zM16 16H2V2h14v14z" />
        </G>
      </G>
    </Svg>
  );
};
