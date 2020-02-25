import * as React from "react";
import { View, StyleSheet } from "react-native";
import ProgressLine from "src/Components/ProgressLine";
import RideInfo from "./Components/RideInfo";
import { getFormatedDate, getProgress } from "src/Helpers/progressCardHelpers";

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
  currentProgress?: number;
  isHorizontal?: boolean;
};

class RideProgressCard extends React.PureComponent<Props> {
  public render() {
    const { origin, destination, isHorizontal, currentProgress, timeInfo, distanceInfo } = this.props;
    const progress = getProgress(origin.date, destination.date, currentProgress);
    const originFormatedDate = getFormatedDate(origin.date);
    const destinationFormatedDate = getFormatedDate(destination.date);
    return (
      <View style={[styles.container, { flexDirection: isHorizontal ? "column-reverse" : "row" }]}>
        <RideInfo
          originPrimaryText={originFormatedDate.time}
          originSecondaryText={originFormatedDate.day}
          destinationPrimaryText={destinationFormatedDate.time}
          destinationSecondaryText={destinationFormatedDate.day}
          extraRideInfo={distanceInfo}
          isHorizontal={isHorizontal}
        />
        <ProgressLine currentProgress={progress} isHorizontal={isHorizontal} />
        <RideInfo
          originPrimaryText={origin.city}
          originSecondaryText={origin.address}
          destinationPrimaryText={destination.city}
          destinationSecondaryText={destination.address}
          extraRideInfo={timeInfo}
          isHorizontal={isHorizontal}
        />
      </View>
    );
  }
}

export default RideProgressCard;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: "100%",
    flexDirection: "row",
  },
});
