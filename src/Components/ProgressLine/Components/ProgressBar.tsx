import * as React from "react";
import { Animated, View, StyleSheet } from "react-native";
import Colors from "src/Themes/Colors";
import Point from "./Point";

type Props = {
  currentProgress?: number;
  interpolate(): void;
};

class ProgressBar extends React.PureComponent<Props> {
  render() {
    const { currentProgress } = this.props;
    return (
      <View style={currentProgress ? styles.progressBar : styles.progressBarDisable}>
        <Animated.View style={[styles.verticalLine, { height: this.props.interpolate() }]} />
        <Point currentProgress={currentProgress} />
      </View>
    );
  }
}

export default ProgressBar;

const styles = StyleSheet.create({
  progressBar: {
    width: 2,
    alignItems: "center",
    marginHorizontal: 15,
    flexDirection: "column",
    backgroundColor: Colors.transperentThemeColor,
  },
  progressBarDisable: {
    width: 2,
    alignItems: "center",
    marginHorizontal: 15,
    flexDirection: "column",
    backgroundColor: Colors.disable,
  },
  verticalLine: {
    width: 2,
    backgroundColor: Colors.themeColor,
  },
});
