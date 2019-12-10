import * as React from "react";
import { View, StyleSheet } from "react-native";
import ProgressLine from "src/Components/ProgressLine";
import RideInfoColumn from "./Components/RideInformationColumn";

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
    const { origin, destination } = this.props;
    return (
      <View style={styles.container}>
        <RideInfoColumn
          style={styles.timeAndDateContainer}
          firstBlockTitle={origin.time}
          firstBlockText={origin.day}
          secondBlockTitle={destination.time}
          secondBlockText={destination.day}
        />
        <View>
          <ProgressLine currentProgress={this.props.currentProgress} />
        </View>
        <RideInfoColumn
          style={styles.citiesContainer}
          firstBlockTitle={origin.city}
          firstBlockText={origin.address}
          secondBlockTitle={destination.city}
          secondBlockText={destination.address}
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
  timeAndDateContainer: {
    minHeight: 100,
    maxWidth: 100,
    justifyContent: "space-between",
  },
  citiesContainer: {
    flexShrink: 1,
    minHeight: 100,
    justifyContent: "space-between",
  },
});
