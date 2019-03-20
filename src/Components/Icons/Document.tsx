import * as React from "react";
import { Svg, G, Path } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ color, height, width }: iconType) => {
  return (
    <Svg width={width || 16} height={height || 20} viewBox="0 0 16 20">
      <G fill="none" fillRule="evenodd">
        <Path d="M-4-2h24v24H-4z" />
        <Path
          fill={color}
          fillRule="nonzero"
          d="M10 0H2C.9 0 .01.9.01 2L0 18c0 1.1.89 2 1.99 2H14c1.1 0 2-.9 2-2V6l-6-6zM2 18V2h7v5h5v11H2z"
        />
      </G>
    </Svg>
  );
};
