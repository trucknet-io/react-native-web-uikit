import * as React from "react";
import { StyleSheet, ViewProps } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Colors from "src/Themes/Colors";

type Props = {
  gradientStartColor: string;
  gradientEndColor: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
  style: ViewProps["style"];
  children?: React.ReactChild;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

class Gradient extends React.PureComponent<Props> {
  static defaultProps = {
    gradientStartColor: Colors.themeGradient.gradientColor1,
    gradientEndColor: Colors.themeGradient.gradientColor2,
    start: { x: 0, y: 1 },
    end: { x: 1, y: 1 },
    style: styles.container,
  };
  public render() {
    const { gradientStartColor, gradientEndColor, start, end, style } = this.props;

    return (
      <LinearGradient start={start} end={end} colors={[gradientStartColor, gradientEndColor]} style={style}>
        {this.props.children}
      </LinearGradient>
    );
  }
}

export default Gradient;
