import * as React from "react";
import { View, Image, Text } from "react-native";

export const SIZE_CONSTANTS = {
  small: "small",
  medium: "medium",
  large: "large",
  mobile: {
    small: "mobile-small",
    medium: "mobile-medium",
    large: "mobile-large",
  },
};

type Props = {
  image: string;
  size?: string;
  borderWidth?: number;
  borderColor?: string;
  badge?: number;
  onPress?: () => void;
};

const FlagWindow = (props: Props) => {
  let size = {
    width: 48,
    height: 48,
  };

  if (props.size) {
    switch (props.size) {
      case SIZE_CONSTANTS.small:
        size = {
          width: 35,
          height: 35,
        };
        break;
      case SIZE_CONSTANTS.medium:
        size = {
          width: 48,
          height: 48,
        };
        break;
      case SIZE_CONSTANTS.large:
        size = {
          width: 100,
          height: 100,
        };
        break;
      case SIZE_CONSTANTS.mobile.medium:
        size = {
          width: 72,
          height: 72,
        };
        break;
    }
  }
  // we need negative margin + padding back to make a badge to be visible
  return (
    <View style={{ paddingRight: 5, marginRight: 5 }}>
      {props.image ? (
        <Image
          style={{
            height: size.height,
            width: size.width,
            borderRadius: size.height / 2,
            borderWidth: props.borderWidth || 1,
            borderColor: "#000",
          }}
          source={{ uri: props.image }}
        />
      ) : (
        <View
          style={{
            height: size.height,
            width: size.width,
            backgroundColor: "#808080",
            borderRadius: size.height / 2,
            borderWidth: props.borderWidth || 1,
            borderColor: "#000",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text style={{ color: "#c7c7c7", fontSize: 24 }}>{"?"}</Text>
        </View>
      )}
    </View>
  );
};

export default FlagWindow;
