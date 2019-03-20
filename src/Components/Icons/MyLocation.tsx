import * as React from "react";
import { Svg, G, Path, Use, Circle, Defs } from "react-native-svg";
import { iconType } from "./iconType";

interface MyLocation extends iconType {
  backgroundColor?: string;
}

export default ({ width, height, color, backgroundColor }: MyLocation) => {
  return (
    <Svg width={width || 44} height={height || 48} viewBox="0 0 44 48">
      <Defs>
        <Circle id="b" cx="18" cy="18" r="18" />
      </Defs>
      <G fill="none" fill-rule="evenodd">
        <G fill-rule="nonzero" transform="translate(4 4)">
          <Use fill={color} href="#b" />
          <Use fill={backgroundColor || "#FFF"} href="#b" />
        </G>
        <Path d="M12 12h20v20H12z" />
        <Path
          fill={color}
          fill-rule="nonzero"
          d="M22 18.727a3.272 3.272 0 1 0 0 6.546 3.272 3.272 0 1 0 0-6.546zm7.315 2.455a7.359 7.359 0 0 0-6.497-6.497V13h-1.636v1.685a7.359 7.359 0 0 0-6.497 6.497H13v1.636h1.685a7.359 7.359 0 0 0 6.497 6.497V31h1.636v-1.685a7.359 7.359 0 0 0 6.497-6.497H31v-1.636h-1.685zM22 27.727A5.723 5.723 0 0 1 16.273 22 5.723 5.723 0 0 1 22 16.273 5.723 5.723 0 0 1 27.727 22 5.723 5.723 0 0 1 22 27.727z"
        />
      </G>
    </Svg>
  );
};
