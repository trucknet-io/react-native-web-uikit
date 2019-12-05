import * as React from "react";
import { Animated, Easing } from "react-native";
import ProgressBar from "./Components/ProgressBar";
import ProgressLine from "./Components/ProgressLine";

type Props = {
  currentProgress?: number;
  direction: "vertical" | "horizontal";
};

type State = {
  progress: Animated.Value;
};

class ProgressLineContainer extends React.PureComponent<Props, State> {
  private animation;
  public state: State = {
    progress: new Animated.Value(0),
  };

  public componentDidMount = () => this.startAnimation();

  public componentDidUpdate = () => this.startAnimation();

  public componentWillUnmount = () => this.animation.stop();

  public render() {
    const { direction, currentProgress } = this.props;
    if (direction === "vertical") {
      return <ProgressBar currentProgress={currentProgress} interpolate={this.interpolate} />;
    }
    return <ProgressLine currentProgress={currentProgress} interpolate={this.interpolate} />;
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

export default ProgressLineContainer;
