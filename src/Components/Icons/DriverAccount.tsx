import * as React from "react";
import { Svg, Circle, G, Path } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ width, height, color }: iconType) => (
  <Svg width={width || 50} height={height || 50} viewBox="0 0 50 50">
    <G fill="none" fillRule="evenodd" transform="translate(1 1)">
      <Path
        stroke={color}
        strokeWidth="2.026"
        // eslint-disable-next-line max-len
        d="M10.702 13.013c-.933 0-1.689.756-1.689 1.689v18.596c0 .933.756 1.689 1.689 1.689h26.596c.933 0 1.689-.756 1.689-1.689V14.702c0-.933-.756-1.689-1.689-1.689H10.702zM11 11.987h26A3.013 3.013 0 0 1 40.013 15v18A3.013 3.013 0 0 1 37 36.013H11A3.013 3.013 0 0 1 7.987 33V15A3.013 3.013 0 0 1 11 11.987z"
      />
      <Path
        stroke={color}
        strokeWidth="1.351"
        // eslint-disable-next-line max-len
        d="M18 24a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-2.333 2.333h4.666A3.667 3.667 0 0 1 24 30H12a3.667 3.667 0 0 1 3.667-3.667z"
      />
      <Path fill={color} d="M28 17h8v1h-8zM28 25h8v1h-8zM28 21h8v1h-8zM28 29h8v1h-8z" />
      <Circle cx="24" cy="24" r="24" stroke={color} />
    </G>
  </Svg>
);
