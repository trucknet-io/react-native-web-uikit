import * as React from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

type Props = {
  gradientStartColor: string;
  gradientEndColor: string;
  children: React.ReactChild;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: any;
};

class Gradient extends React.PureComponent<Props> {
  public render() {
    const { gradientStartColor, gradientEndColor, start, end, style } = this.props;

    return (
      <LinearGradient
        start={start || { x: 0, y: 1 }}
        end={end || { x: 1, y: 1 }}
        colors={[gradientStartColor, gradientEndColor]}
        style={style || styles.container}>
        {this.props.children}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Gradient;
