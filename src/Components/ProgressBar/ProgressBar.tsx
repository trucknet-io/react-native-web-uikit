import * as React from "react";
import { View, Animated, Easing, LayoutChangeEvent, StyleSheet } from "react-native";
import { colorTheme } from "src/Themes/Colors";

type IProps = {
  height: number;
  color: string;
};
type IState = {
  indicatorMargin: Animated.Value;
};

const INDICATOR_WIDTH = 80;

export class ProgressBar extends React.PureComponent<IProps, IState> {
  private animation;
  static defaultProps = {
    color: colorTheme.light.themeColor,
    height: 5,
  };
  public state = {
    indicatorMargin: new Animated.Value(0),
  };

  public componentWillUnmount = () => {
    if (this.animation) {
      this.animation.stop();
    }
  };
  render() {
    return (
      <View
        onLayout={this.startIndicatorAnimation}
        style={[
          styles.container,
          {
            height: this.props.height,
            backgroundColor: this.addTransparencyToColor(this.props.color),
          },
        ]}>
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
  private animateIndicatorMargin = (windowWidth: number = 0) =>
    Animated.loop(
      Animated.timing(this.state.indicatorMargin, {
        toValue: windowWidth,
        easing: Easing.linear,
        duration: 5000,
        useNativeDriver: false,
      }),
    );

  private startIndicatorAnimation = (e: LayoutChangeEvent) => {
    this.animation = this.animateIndicatorMargin(e.nativeEvent.layout.width);
    this.animation.start();
  };
  private addTransparencyToColor = (color: string) => `${color}44`;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default ProgressBar;
