import * as React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import moment from "moment";
import { colorTheme } from "src/Themes/Colors";
import CalendarDay from "src/Components/CalendarDay";

interface Props {
  onDayPress(day: Date): void;
  currentDate: Date;
  style?: ViewStyle;
  fontSize: number;
  theme: "light" | "dark";
}

class MonthCalendar extends React.PureComponent<Props> {
  static defaultProps = {
    fontSize: 14,
    currentDate: new Date(),
    theme: "light",
  };
  public render() {
    const themeColors = colorTheme[this.props.theme];
    return (
      <View style={[styles.container, { backgroundColor: themeColors.background }, this.props.style]}>
        <View style={styles.monthDaysContainer}>{this.renderMonthDayNumbers()}</View>
      </View>
    );
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
          fontSize={this.props.fontSize}
        />,
      );

      i++;
    }
    return days;
  };
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    borderRadius: 4,
  },
  headerContainer: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: "7%" },
  monthContainer: { flex: 3, paddingVertical: 12 },
  switchMonthButtonsContainer: { flex: 1, flexDirection: "row", justifyContent: "space-between" },
  monthDaysContainer: { flexDirection: "row", flexWrap: "wrap" },
  dayContainer: {
    width: `${100 / 7}%`,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  activeDayContainer: {},
  monthDay: {
    minWidth: 24,
    minHeight: 24,
    lineHeight: 24,
    textAlign: "center",
    borderRadius: 12,
  },
});

export default MonthCalendar;
