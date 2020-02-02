import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import CalendarDay from "src/Containers/Calendar/Components/CalendarDay";
import moment from "moment";

type Props = {
  currentDate: Date;
  onDayPress(date: Date): void;
  theme: "dark" | "light";
  style?: ViewStyle;
  fontSize: number;
};

class Calendar extends React.PureComponent<Props> {
  static defaultProps = {
    currentDate: new Date(),
    theme: "light",
    fontSize: 14,
  };

  public render() {
    const weekDays = this.getWeekDays();
    return <View style={[styles.container, this.props.style]}>{weekDays.map(this.renderDay)}</View>;
  }

  private renderDay = (day) => {
    return (
      <CalendarDay
        day={day}
        key={day.toString()}
        currentDate={this.props.currentDate}
        onDayPress={this.props.onDayPress}
        theme={this.props.theme}
        type="week"
        fontSize={this.props.fontSize}
      />
    );
  };

  private getWeekDays = () => {
    const startOfWeek = moment(this.props.currentDate).startOf("week");
    return moment.weekdays().map((_, dayNumber) => moment(startOfWeek).add(dayNumber, "days"));
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default Calendar;
