import * as React from "react";
import { View, Animated, Dimensions, Easing } from "react-native";
import { colorTheme } from "src/Themes/Colors";

type IProps = {
  height: number;
  color: string;
};
type IState = {
  indicatorMargin: Animated.Value;
  windowWidth: number;
};

const INDICATOR_WIDTH = 200;

class ProgressBar extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    color: colorTheme.light.themeColor,
    height: 5,
  };
  public state = {
    indicatorMargin: new Animated.Value(-INDICATOR_WIDTH),
    windowWidth: Dimensions.get("window").width,
  };
  public componentDidMount = () => {
    Dimensions.addEventListener("change", this.setWindowWidth);
    this.animateProgressBar();
  };
  public componentWillUnmount = () => {
    Dimensions.removeEventListener("change", this.setWindowWidth);
  };
  render() {
    return (
      <View
        style={{
          width: this.state.windowWidth,
          height: this.props.height,
          backgroundColor: this.addTransparencyToColor(this.props.color),
        }}>
        <Animated.View
          style={{
            width: INDICATOR_WIDTH,
            height: this.props.height,
            backgroundColor: this.props.color,
            marginLeft: this.state.indicatorMargin,
          }}
        />
      </View>
    );
  }
  private setWindowWidth = () =>
    this.setState({ windowWidth: Dimensions.get("window").width }, this.animateProgressBar);

  private addTransparencyToColor = (color: string) => `${color}44`;
  private animateProgressBar = () => {
    Animated.loop(
      Animated.timing(this.state.indicatorMargin, {
        toValue: this.state.windowWidth,
        easing: Easing.linear,
        duration: 2500,
      }),
    ).start();
  };
}

export default ProgressBar;
