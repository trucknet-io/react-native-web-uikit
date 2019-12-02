import * as React from "react";
import { View, StyleSheet, Animated, Easing, Text } from "react-native";
import Colors from "src/Themes/Colors";
import Fonts from "src/Themes/Fonts";

type Props = {
  origin: {
    startTime: string;
    startDay: string;
    startCity: string;
    startAdress?: string;
  };
  destination: {
    endTime: string;
    endDay: string;
    endCity: string;
    endAdress?: string;
  };
  currentProgress?: number;
};

type State = {
  progress: Animated.Value;
};

export class RideProgressCard extends React.PureComponent<Props, State> {
  private animation;
  public state: State = {
    progress: new Animated.Value(0),
  };

  public componentDidMount = () => this.startAnimation();

  public componentWillUnmount = () => this.animation.stop();

  public render() {
    return (
      <View style={styles.container}>
        {this.renderTimeAndDate()}
        {this.renderProgressBar()}
        {this.renderCities()}
      </View>
    );
  }

  private renderTimeAndDate = () => {
    const { origin, destination } = this.props;
    return (
      <View style={styles.timeAndDateContainer}>
        {this.renderPointInTime(origin.startTime, origin.startDay)}
        {this.renderPointInTime(destination.endTime, destination.endDay)}
      </View>
    );
  };

  private renderPointInTime = (time: string, day: string) => (
    <View>
      <Text style={styles.mainText}>{time}</Text>
      <Text style={styles.secondaryText}>{day}</Text>
    </View>
  );

  private renderProgressBar = () => (
    <View style={styles.progressBar}>
      {this.renderProgressLine()}
      {this.renderPoint()}
    </View>
  );

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

  private renderCities = () => {
    const { origin, destination } = this.props;
    return (
      <View style={styles.cityesContainer}>
        {this.renderCity(origin.startCity, origin.startAdress)}
        {this.renderCity(destination.endCity, destination.endAdress)}
      </View>
    );
  };

  private renderCity = (city: string, adress?: string) => (
    <View>
      <Text style={styles.mainText}>{city}</Text>
      <Text style={styles.secondaryText}>{adress}</Text>
    </View>
  );

  private calcAnimation = () =>
    Animated.timing(this.state.progress, {
      toValue: this.props.currentProgress || 0,
      easing: Easing.linear,
      duration: 700,
    });

  private startAnimation = () => {
    this.animation = this.calcAnimation();
    this.animation.start();
  };
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeAndDateContainer: {
    minHeight: 100,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  progressBar: {
    width: 2,
    flexShrink: 1,
    marginHorizontal: 15,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Colors.transperentThemeColor,
  },
  point: {
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: Colors.themeColor,
  },
  cityesContainer: {
    minHeight: 100,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  mainText: {
    ...Fonts.style.description,
  },
  secondaryText: {
    color: Colors.secondaryText,
    ...Fonts.style.small,
  },
});
