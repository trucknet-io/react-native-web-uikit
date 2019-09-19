import * as React from "react";
import { View, Animated, Dimensions, Easing } from "react-native";
import { colorTheme } from "../Themes/Colors";

type IProps = {
  height: number;
  color: string;
};
type IState = {
  indicatorMargin: Animated.Value;
  windowWidth: number;
};

class ProgressBar extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    color: colorTheme.light.themeColor,
    height: 5,
  };
  private indicatorWidth = 200;
  public state = {
    indicatorMargin: new Animated.Value(-this.indicatorWidth),
    windowWidth: Dimensions.get("window").width,
  };
  public componentDidMount = () => {
    Dimensions.addEventListener("change", (dim) => {
      this.setState({ windowWidth: dim.window.width }, this.animateProgressBar);
    });
    this.animateProgressBar();
  };
  render() {
    return (
      <View style={{ width: "100%", height: this.props.height, backgroundColor: `${this.props.color}44` }}>
        <Animated.View
          style={{
            width: this.indicatorWidth,
            height: this.props.height,
            backgroundColor: this.props.color,
            marginLeft: this.state.indicatorMargin,
          }}
        />
      </View>
    );
  }
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
