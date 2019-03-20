import * as React from "react";
import { Svg, Text, TSpan } from "react-native-svg";
import { iconType } from "./iconType";

export default ({ width, height, color }: iconType) => {
  return (
    <Svg width={width || 27} height={height || 10} viewBox="0 0 27 3">
      <Text
        fill={color || "#29464D"}
        fillRule="evenodd"
        fontFamily="Roboto-Medium, Roboto"
        fontSize="14"
        fontWeight="400"
        transform="translate(-326 -540)">
        <TSpan x="326" y="546">
          VAT
        </TSpan>
      </Text>
    </Svg>
  );
};
