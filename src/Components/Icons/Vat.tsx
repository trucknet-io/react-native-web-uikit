import * as React from "react";
import { Svg, Text, TSpan } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ width, height, color }: iconType) => {
  return (
    <Svg width={width || 27} height={height || 10} viewBox="0 0 27 3">
      <Text
        fill={color || "#29464D"}
        fill-rule="evenodd"
        font-family="Roboto-Medium, Roboto"
        font-size="14"
        font-weight="400"
        transform="translate(-326 -540)">
        <TSpan x="326" y="546">
          VAT
        </TSpan>
      </Text>
    </Svg>
  );
};
