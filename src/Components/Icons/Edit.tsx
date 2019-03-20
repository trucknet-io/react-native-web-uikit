import * as React from "react";
import { Svg, G, Path } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ width, height, color }: iconType) => (
  <Svg width={width || 18} height={height || 18} viewBox="0 0 18 18">
    <G fill="none" fillRule="evenodd">
      <Path d="M-3-3h24v24H-3z" />
      <Path
        fill={color}
        fillRule="nonzero"
        d="M11.06 6.02l.92.92L2.92 16H2v-.92l9.06-9.06zM14.66 0c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 0 0 0-1.41L15.37.29c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L0 14.25V18h3.75L14.81 6.94l-3.75-3.75z"
      />
    </G>
  </Svg>
);
