import * as React from "react";
import { Animated, View, StyleSheet, Easing } from "react-native";
import Point from "./Components/Point";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Style = ReturnType<typeof getStyles>;

interface OwnProps {
  currentProgress?: number;
  isHorizontal?: boolean;
}

interface Props extends ThemeProps<Style>, OwnProps {}

type State = {
  progress: Animated.Value;
};

export class PureProgressLine extends React.PureComponent<Props, State> {
  private animation;
  public state: State = {
    progress: new Animated.Value(0),
  };

  public componentDidMount = () => this.startAnimation();

  public componentDidUpdate = () => this.startAnimation();

  public componentWillUnmount = () => this.animation.stop();

  public render() {
    const { currentProgress } = this.props;
    const progressLineStyles = this.getProgressLineStyles();
    return (
      <View style={progressLineStyles.container}>
        <View style={progressLineStyles.progressBarContainer}>
          <Animated.View style={progressLineStyles.line} />
          <Point currentProgress={currentProgress} />
        </View>
        <Point currentProgress={currentProgress} isHollowPoint />
      </View>
    );
  }

  private getProgressLineStyles = () => {
    const { styles } = this.props;
    if (this.props.isHorizontal) {
      return {
        container: styles.horizontalContainer,
        progressBarContainer: styles.horizontalProgressBarContainer,
        line: [styles.horizontalLine, { width: this.interpolate() }],
      };
    }
    return {
      container: styles.verticalContainer,
      progressBarContainer: styles.verticalProgressBarContainer,
      line: [styles.verticalLine, { height: this.interpolate() }],
    };
  };

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
    });

  private getValidValue = (value?: number): number => {
    if (value === undefined) return 0;
    if (value > 100) return 100;
    return value;
  };
}

const getStyles = ({ colors, props: { currentProgress } }: ThemeParamsType<OwnProps>) => {
  const lineBackgroundColor = currentProgress ? colors.transparentThemeColor : colors.disable;
  return StyleSheet.create({
    horizontalContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
    },
    verticalContainer: {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    horizontalProgressBarContainer: {
      height: 2,
      width: "99%",
      alignItems: "center",
      marginVertical: 10,
      flexDirection: "row",
      backgroundColor: lineBackgroundColor,
    },
    horizontalLine: {
      height: 2,
      backgroundColor: colors.themeColor,
    },
    verticalProgressBarContainer: {
      width: 2,
      height: "95%",
      alignItems: "center",
      marginHorizontal: 10,
      backgroundColor: lineBackgroundColor,
    },
    verticalLine: {
      width: 2,
      backgroundColor: colors.themeColor,
    },
  });
};
export default withTheme<Props>(getStyles)(PureProgressLine);
