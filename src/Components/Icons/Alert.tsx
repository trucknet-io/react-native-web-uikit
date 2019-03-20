import * as React from "react";
import { Svg, G, Path, Polygon } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ width, height, color }: iconType) => (
  <Svg width={width || 20} height={height || 20} viewBox="0 0 20 20">
    <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <G id="baseline-help_outline-24px" transform="translate(-2.000000, -2.000000)">
        <Polygon id="Path" points="0 0 24 0 24 24 0 24" />
        <Path
          d="M11,18 L13,18 L13,16 L11,16 L11,18 Z M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 Z"
          id="Shape"
          fill={color}
          fillRule="nonzero"
        />
        <Polygon id="Line" fill={color} fillRule="nonzero" points="11 6 13 6 13 14.4882993 11 14.4882993" />
      </G>
    </G>
  </Svg>
);
