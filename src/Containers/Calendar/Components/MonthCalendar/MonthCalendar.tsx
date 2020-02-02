import * as React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import moment from "moment";
import CalendarDay from "src/Containers/Calendar/Components/CalendarDay";

interface Props {
  onDayPress(day: Date): void;
  currentDate: Date;
  style?: ViewStyle;
  theme: "light" | "dark";
}

class MonthCalendar extends React.PureComponent<Props> {
  static defaultProps = {
    currentDate: new Date(),
    theme: "light",
  };
  public render() {
    return <View style={[styles.container, this.props.style]}>{this.renderMonthDayNumbers()}</View>;
  }

  private renderMonthDayNumbers = () => {
    const startDay = moment(this.props.currentDate)
      .startOf("month")
      .startOf("week");

    const days: React.ReactNode[] = [];
    let day = startDay;
    let i = 0;
    while (!day.isAfter(this.props.currentDate, "month")) {
      day = moment(startDay).add(i, "days");
      days.push(
        <CalendarDay
          key={day.toString()}
          day={new Date(day.toString())}
          currentDate={this.props.currentDate}
          theme={this.props.theme}
          onDayPress={this.props.onDayPress}
        />,
      );

      i++;
    }
    return days;
  };
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", flexWrap: "wrap" },
});

export default MonthCalendar;
