import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import moment from "moment";
import colors from "src/Themes/Colors";

type Props = {
  currentDate: Date;
};

class WeekDays extends React.PureComponent<Props> {
  static defaultProps = {
    currentDate: new Date(),
  };

  public render() {
    const weekDayNames: React.ReactNode[] = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = moment(this.props.currentDate)
        .startOf("week")
        .add(i, "days")
        .format("dd");
      weekDayNames.push(
        <View style={styles.dayContainer} key={currentDay}>
          <Text style={styles.weekDay}>{currentDay}</Text>
        </View>,
      );
    }

    return <View style={styles.weekDaysContainer}>{weekDayNames}</View>;
  }
}

const styles = StyleSheet.create({
  weekDaysContainer: { flexDirection: "row" },
  weekDay: { color: colors.subtitle, fontSize: 12 },
  dayContainer: { flexBasis: `${100 / 7}%`, alignItems: "center", justifyContent: "center" },
});

export default WeekDays;
