import * as React from "react";
import { View, StyleSheet, Animated, Easing, Text } from "react-native";
import Colors from "src/Themes/Colors";

type IProps = {
  origin: {
    startTime: string;
    startDay: string;
    startCity: string;
    startAdress: string;
  };
  destination: {
    startTime: string;
    startDay: string;
    startCity: string;
    startAdress: string;
  };
  progress: number;
};

type IState = {
  progress: Animated.Value;
};

export class RideProgressCard extends React.PureComponent<IProps, IState> {
  private animation;
  public state: IState = {
    progress: new Animated.Value(0),
  };

  public componentDidMount = () => this.startAnimation();

  public componentWillUnmount = () => this.animation.stop();

  public render() {
    return (
      <View style={styles.container}>
        {this.renderTimeAndDate()}
        {this.renderProgressBar()}
        {this.renderCityes()}
      </View>
    );
  }

  private renderTimeAndDate = () => {
    const { origin, destination } = this.props;
    return (
      <View style={styles.timeAndDateContainer}>
        {this.renderPointInTime(origin.startTime, origin.startDay)}
        {this.renderPointInTime(destination.startTime, destination.startDay)}
        {/* {this.renderPointInTime("08:15", "10 Nov")}
        {this.renderPointInTime("16:40", "Today")} */}
      </View>
    );
  };

  private renderPointInTime = (time, day) => (
    <View>
      <Text>{time}</Text>
      <Text>{day}</Text>
    </View>
  );

  private renderProgressBar = () => (
    <View style={styles.progressBar}>
      {this.renderProgressLine()}
      {this.renderPoint()}
    </View>
  );

  private renderProgressLine = () => {
    return (
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
  };

  private renderPoint = () => <View style={styles.point} />;

  private renderCityes = () => {
    const { origin, destination } = this.props;
    return (
      <View style={styles.cityesContainer}>
        {this.renderCity(origin.startCity, origin.startAdress)}
        {this.renderCity(destination.startCity, destination.startAdress)}
        {/* {this.renderCity("Paris, France", "84, Ave des Champs-Elisey")}
        {this.renderCity("Nantes, France", "Paran 3, 615 A")} */}
      </View>
    );
  };

  private renderCity = (city, adress) => (
    <View>
      <Text>{city}</Text>
      <Text>{adress}</Text>
    </View>
  );

  private calcAnimation = () =>
    Animated.timing(this.state.progress, {
      toValue: this.props.progress,
      easing: Easing.linear,
      duration: 800,
    });

  private startAnimation = () => {
    this.animation = this.calcAnimation();
    this.animation.start();
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  timeAndDateContainer: {
    height: 100,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  progressBar: {
    marginHorizontal: 10,
    height: 100,
    width: 2,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Colors.transperentThemeColor,
  },
  point: {
    width: 6,
    height: 6,
    backgroundColor: Colors.themeColor,
    borderRadius: 10,
  },
  cityesContainer: {
    height: 100,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  animatedBar: {},
});
