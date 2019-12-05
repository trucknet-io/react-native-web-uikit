import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "src/Themes/Colors";
import Fonts from "src/Themes/Fonts";
import ProgressLine from "src/Components/ProgressLine";

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
        <ProgressLine currentProgress={this.props.currentProgress} direction={"vertical"} />
        {this.renderCities()}
      </View>
    );
  }

  private renderTimeAndDate = () => {
    const { origin, destination } = this.props;
    return (
      <View style={styles.timeAndDateContainer}>
        {this.renderCell(origin.time, origin.day)}
        {this.renderCell(destination.time, destination.day)}
      </View>
    );
  };

  private renderCities = () => {
    const { origin, destination } = this.props;
    return (
      <View style={styles.citiesContainer}>
        {this.renderCell(origin.city, origin.address)}
        {this.renderCell(destination.city, destination.address)}
      </View>
    );
  };

  private renderCell = (mainText: string, secondaryText?: string) => (
    <View>
      <Text style={styles.mainText}>{mainText}</Text>
      <Text style={styles.secondaryText}>{secondaryText}</Text>
    </View>
  );
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
  mainText: {
    color: Colors.defaultText,
    ...Fonts.style.description,
  },
  secondaryText: {
    color: Colors.secondaryText,
    ...Fonts.style.small,
  },
});
