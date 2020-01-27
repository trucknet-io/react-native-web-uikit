import * as React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface IProps {
  size: number;
  color?: string;
  hollowSize: number;
  style?: ViewStyle;
}

class Point extends React.PureComponent<IProps> {
  public static defaultProps = {
    size: 8,
    hollowSize: 0,
  };
  public render() {
    const { color, hollowSize, size } = this.props;
    return (
      <View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: size / 2 - hollowSize / 2,
            borderColor: color,
          },
          this.props.style,
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 2,
  },
});

export default Point;
