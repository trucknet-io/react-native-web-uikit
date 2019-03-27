import * as React from "react";
import { Svg, G, Path } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ color, width, height }: iconType) => {
  return (
    <Svg height={width || 22} width={height || 19} viewBox="0 0 19 22">
      <G fill="none" fillRule="evenodd">
        <Path d="M-2-1h24v24H-2z" />
        <Path
          // eslint-disable-next-line max-len
          d="M14 0H2C.9 0 0 .9 0 2v14h2V2h12V0zm-1 4l6 6v10c0 1.1-.9 2-2 2H5.99C4.89 22 4 21.1 4 20l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L12 5.5V11z"
          fill={color}
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
};
