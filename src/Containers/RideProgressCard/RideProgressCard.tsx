import * as React from "react";
import { View, StyleSheet } from "react-native";
import ProgressLine from "src/Components/ProgressLine";
import RideInfo from "./Components/RideInfo";
import { getFormatedDate } from "src/Helpers/progressCardHelpers";

type Props = {
  origin: {
    date: Date;
    city: React.ReactNode;
    address?: React.ReactNode;
  };
  destination: {
    date: Date;
    city: React.ReactNode;
    address?: React.ReactNode;
  };
  timeInfo?: React.ReactNode;
  distanceInfo?: React.ReactNode;
  stops: {
    amount: number;
    stopsPass: number;
    intermediatePointsText?: React.ReactNode[];
  };
};

class RideProgressCard extends React.PureComponent<Props> {
  private renderProgressLines = () => {
    const lines: any = [];
    for (let i = 0; i < this.props.stops.amount; i++) {
      lines.push(
        <ProgressLine
          amountOfStops={this.props.stops.amount}
          currentStop={i + 1}
          stopsPass={this.props.stops.stopsPass}
          description={this.props.stops.intermediatePointsText ? this.props.stops.intermediatePointsText[i] : undefined}
        />,
      );
    }

    return lines;
  };
  public render() {
    const { origin, destination } = this.props;
    const originFormatedDate = getFormatedDate(origin.date);
    const destinationFormatedDate = getFormatedDate(destination.date);
    return (
      <View style={styles.container}>
        <RideInfo
          originPrimaryText={originFormatedDate.time}
          originSecondaryText={originFormatedDate.day}
          destinationPrimaryText={destinationFormatedDate.time}
          destinationSecondaryText={destinationFormatedDate.day}
        />
        <View style={{ flexShrink: 1 }}>{this.renderProgressLines()}</View>
        <RideInfo
          originPrimaryText={origin.city}
          originSecondaryText={origin.address}
          destinationPrimaryText={destination.city}
          destinationSecondaryText={destination.address}
        />
      </View>
    );
  }
}

export default RideProgressCard;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "row",
  },
});
