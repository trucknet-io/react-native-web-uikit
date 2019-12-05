import * as React from "react";
import { Animated, View, StyleSheet, Easing } from "react-native";
import Colors from "src/Themes/Colors";
import Point from "./Components/Point";

type Props = {
  currentProgress?: number;
};

type State = {
  progress: Animated.Value;
};

class ProgressLine extends React.PureComponent<Props, State> {
  private animation;
  public state: State = {
    progress: new Animated.Value(0),
  };

  public componentDidMount = () => this.startAnimation();

  public componentDidUpdate = () => this.startAnimation();

  public componentWillUnmount = () => this.animation.stop();

  public render() {
    const { currentProgress } = this.props;
    return (
      <View
        style={[
          styles.progressBar,
          { backgroundColor: currentProgress ? Colors.transperentThemeColor : Colors.disable },
        ]}>
        <Animated.View style={[styles.verticalLine, { height: this.interpolate() }]} />
        <Point currentProgress={currentProgress} />
      </View>
    );
  }

  private interpolate = () =>
    this.state.progress.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
    });

  private startAnimation = () => {
    this.animation = this.calcAnimation();
    this.animation.start();
  };

  private calcAnimation = () =>
    Animated.timing(this.state.progress, {
      toValue: this.getValidValue(this.props.currentProgress),
      easing: Easing.linear,
      duration: 700,
      useNativeDriver: true,
    });

  private getValidValue = (value?: number): number => {
    if (value === undefined) return 0;
    if (value > 100) return 100;
    return value;
  };
}

export default ProgressLine;

const styles = StyleSheet.create({
  progressBar: {
    width: 2,
    alignItems: "center",
    marginHorizontal: 15,
    flexDirection: "column",
  },
  verticalLine: {
    width: 2,
    backgroundColor: Colors.themeColor,
  },
});
