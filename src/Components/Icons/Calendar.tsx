import * as React from "react";
import { Svg, G, Path } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ width, height, color }: iconType) => {
  return (
    <Svg width={width || 18} height={height || 22} viewBox="0 0 15 16">
      <G fill="none" fillRule="evenodd">
        <Path
          fill={color || "#1F3239"}
          fillRule="nonzero"
          // eslint-disable-next-line max-len
          d="M13.09 1.455h-.726V0h-1.455v1.455H3.636V0H2.182v1.455h-.727C.655 1.455 0 2.109 0 2.909v11.636C0 15.345.655 16 1.455 16H13.09c.8 0 1.454-.655 1.454-1.455V2.91c0-.8-.654-1.454-1.454-1.454zm0 13.09H1.456V5.091H13.09v9.454z"
        />
        <Path d="M-5-4h24v24H-5z" />
      </G>
    </Svg>
  );
};
