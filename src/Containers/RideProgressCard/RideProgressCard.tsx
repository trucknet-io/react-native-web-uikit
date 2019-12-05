import * as React from "react";
import { View, StyleSheet } from "react-native";
import ProgressLine from "src/Components/ProgressLine";
import Cell from "./Components/Cell";

type Props = {
  origin: {
    time: string;
    day: string;
    city: string;
    address?: string;
  };
  destination: {
    time: string;
    day: string;
    city: string;
    address?: string;
  };
  currentProgress?: number;
};

class RideProgressCard extends React.PureComponent<Props> {
  public render() {
    return (
      <View style={styles.container}>
        {this.renderTimeAndDate()}
        <ProgressLine currentProgress={this.props.currentProgress} />
        {this.renderCities()}
      </View>
    );
  }

  private renderTimeAndDate = () => {
    const { origin, destination } = this.props;
    return (
      <View style={styles.timeAndDateContainer}>
        <Cell mainText={origin.time} secondaryText={origin.day} />
        <Cell mainText={destination.time} secondaryText={destination.day} />
      </View>
    );
  };

  private renderCities = () => {
    const { origin, destination } = this.props;
    return (
      <View style={styles.citiesContainer}>
        <Cell mainText={origin.city} secondaryText={origin.address} />
        <Cell mainText={destination.city} secondaryText={destination.address} />
      </View>
    );
  };
}

export default RideProgressCard;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "row",
  },
  timeAndDateContainer: {
    minHeight: 100,
    maxWidth: 100,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  citiesContainer: {
    flexShrink: 1,
    minHeight: 100,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
