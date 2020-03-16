import * as React from "react";
import { Svg, Path, G } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ width, height, color }: iconType) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 18">
      <G fill="none" fillRule="evenodd">
        <Path d="M-4-3h24v24H-4z" />
        <Path
          fill={color}
          fillRule="nonzero"
          d="M0 16h16v2H0v-2zM16 0H0v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4V7h2a2 2 0 0 0 2-2V2c0-1.11-.89-2-2-2zm-4 10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V2h10v8zm4-5h-2V2h2v3z"
        />
      </G>
    </Svg>
  );
};
