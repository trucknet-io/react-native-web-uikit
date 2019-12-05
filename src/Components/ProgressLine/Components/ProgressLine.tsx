import * as React from "react";
import { Animated, View, StyleSheet } from "react-native";
import Colors from "src/Themes/Colors";
import Point from "./Point";

type Props = {
  currentProgress?: number;
  interpolate(): void;
};

class ProgressLine extends React.PureComponent<Props> {
  render() {
    const { currentProgress } = this.props;
    return (
      <View style={currentProgress ? styles.progressLine : styles.progressLineDisable}>
        {this.renderHorizontalLine()}
        <Point currentProgress={currentProgress} />
      </View>
    );
  }

  private renderHorizontalLine = () => (
    <Animated.View style={[styles.horizontalLine, { width: this.props.interpolate() }]} />
  );
}

export default ProgressLine;

const styles = StyleSheet.create({
  progressLine: {
    height: 2,
    alignItems: "center",
    marginVertical: 15,
    flexDirection: "row",
    backgroundColor: Colors.transperentThemeColor,
  },
  progressLineDisable: {
    height: 2,
    alignItems: "center",
    marginVertical: 15,
    flexDirection: "row",
    backgroundColor: Colors.disable,
  },
  horizontalLine: {
    height: 2,
    backgroundColor: Colors.themeColor,
  },
});
