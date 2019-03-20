import * as React from "react";
import { Svg, G, Polygon } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ width, height, color }: iconType) => {
  return (
    <Svg width={width || 12} height={height || 8} viewBox="0 0 12 8">
      <G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <G id="outline-keyboard_arrow_up-24px" transform="translate(-6.000000, -8.000000)">
          <Polygon id="Path" points="0 0 24 0 24 24 0 24" />
          <Polygon
            id="Path"
            fill={color}
            fill-rule="nonzero"
            points="7.41 15.41 12 10.83 16.59 15.41 18 14 12 8 6 14"
          />
        </G>
      </G>
    </Svg>
  );
};
