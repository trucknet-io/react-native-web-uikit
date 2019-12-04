import * as React from "react";
import { Animated, View, StyleSheet, Easing } from "react-native";
import Colors from "src/Themes/Colors";

type Props = {
  currentProgress?: number;
};

type State = {
  progress: Animated.Value;
};

export class ProgressLine extends React.PureComponent<Props, State> {
  private animation;
  public state: State = {
    progress: new Animated.Value(0),
  };

  public componentDidMount = () => this.startAnimation();

  public componentDidUpdate = () => this.startAnimation();

  public componentWillUnmount = () => this.animation.stop();

  public render() {
    return (
      <View style={styles.progressBar}>
        {this.renderProgressLine()}
        {this.renderPoint()}
      </View>
    );
  }
  private renderProgressLine = () => (
    <Animated.View
      style={{
        width: 2,
        backgroundColor: Colors.themeColor,
        height: this.state.progress.interpolate({
          inputRange: [0, 100],
          outputRange: ["0%", "100%"],
        }),
      }}
    />
  );

  private renderPoint = () => <View style={styles.point} />;

  private startAnimation = () => {
    this.animation = this.calcAnimation();
    this.animation.start();
  };

  private calcAnimation = () =>
    Animated.timing(this.state.progress, {
      toValue: this.checkValue(this.props.currentProgress),
      easing: Easing.linear,
      duration: 700,
      useNativeDriver: true,
    });

  private checkValue = (value?: number): number => {
    if (value === undefined) return 0;
    if (value > 100) return 100;
    return value;
  };
}

const styles = StyleSheet.create({
  progressBar: {
    width: 2,
    alignItems: "center",
    marginHorizontal: 15,
    flexDirection: "column",
    backgroundColor: Colors.transperentThemeColor,
  },
  point: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: Colors.themeColor,
  },
});
