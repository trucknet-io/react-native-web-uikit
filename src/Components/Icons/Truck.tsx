import * as React from "react";
import { Svg, G, Path, Circle } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ height, width, color }: iconType) => (
  <Svg width={width} height={height} viewBox="0 0 24 15">
    <G fill="none" fillRule="nonzero">
      <Path d="M0-6h24v24H0z" />
      <G>
        <Path
          fill={color}
          d="M0 13v-2h1V5.5C1 4.12 2.007 3 3.25 3H8V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11H0zm8-8H3v6h5V5zm14-3H10v9h12V2z"
        />
        <Circle cx="7" cy="12" r="2" fill="#E9FAEF" stroke={color} strokeWidth="2" />
        <Circle cx="19" cy="12" r="2" fill="#E9FAEF" stroke={color} strokeWidth="2" />
      </G>
    </G>
  </Svg>
);
