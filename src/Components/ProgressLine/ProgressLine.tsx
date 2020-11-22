import * as React from "react";
import { Animated, View, StyleSheet, Text } from "react-native";
import Point from "./Components/Point";
import { NavigationMap } from "src/Components/Icons";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Style = ReturnType<typeof getStyles>;

interface DefaultProps {
  amountOfStops: number;
  currentStop: number;
  stopsPass: number;
}

interface OwnProps extends DefaultProps {
  isHorizontal?: boolean;
  description?: React.ReactNode;
}

interface Props extends ThemeProps<Style>, OwnProps {}

type State = {
  progress: Animated.Value;
};

export class PureProgressLine extends React.PureComponent<Props, State> {
  static defaultProps: DefaultProps = {
    amountOfStops: 1,
    currentStop: 1,
    stopsPass: 1,
  };

  public state: State = {
    progress: new Animated.Value(0),
  };

  public render() {
    const isFirstLine = this.props.currentStop === 1;
    const isLastLine = this.props.currentStop === this.props.amountOfStops;
    const isDepartureFromCurrentPoint = this.props.stopsPass >= this.props.currentStop - 1;
    const isArrivedToCurrentPoint = this.props.stopsPass >= this.props.currentStop;
    return (
      <View style={this.props.styles.container}>
        {isFirstLine ? <Point isArrivedTo={isDepartureFromCurrentPoint} /> : null}
        <View
          style={[
            this.props.styles.progressBarContainer,
            { backgroundColor: isArrivedToCurrentPoint ? this.props.colors.themeColor : this.props.colors.disable },
          ]}>
          <View style={this.props.styles.line} />
        </View>
        {isLastLine ? (
          <NavigationMap
            height={22}
            width={17}
            color={isArrivedToCurrentPoint ? this.props.colors.themeColor : this.props.colors.disable}
          />
        ) : (
          <View style={this.props.styles.destinationPointContainer}>
            <Point isHollowPoint isArrivedTo={isArrivedToCurrentPoint} />
            <Text style={this.props.styles.destinationTextContainer} numberOfLines={3}>
              {this.props.description}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const getStyles = ({ colors }: ThemeParamsType<OwnProps>) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      marginHorizontal: 5,
    },
    progressBarContainer: {
      width: 2,
      flex: 1,
      alignItems: "flex-start",
      marginHorizontal: 5,
    },
    line: {
      width: 2,
      backgroundColor: colors.themeColor,
    },
    destinationPointContainer: { flexDirection: "row", alignItems: "center", justifyContent: "center", height: 16 },
    destinationTextContainer: { position: "absolute", left: 24, color: colors.defaultText, width: 270 },
  });
};
export default withTheme<Props, DefaultProps>(getStyles)(PureProgressLine);
