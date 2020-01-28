import React from "react";
import { View, ViewStyle, StyleSheet, TextStyle } from "react-native";
import { CalendarDay } from "src/Components/MonthCalendar";
import moment from "moment";
import { colorTheme } from "src/Themes/Colors";

type Props = {
  currentDate: Date;
  onDayPress(date: Date): void;
  theme: "dark" | "light";
  style?: ViewStyle;
  daySize: number;
  dayNumberFontStyle?: TextStyle;
  dayNameFontsStyle?: TextStyle;
};

class Calendar extends React.PureComponent<Props> {
  static defaultProps = {
    currentDate: new Date(),
    theme: "light",
    daySize: 28,
  };

  public render() {
    const weekDays = this.getWeekDays();
    const themeColors = colorTheme[this.props.theme];
    return (
      <View style={[styles.container, { backgroundColor: themeColors.background }, this.props.style]}>
        {weekDays.map(this.renderDay)}
      </View>
    );
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
        size={this.props.daySize}
        dayNameFontsStyle={this.props.dayNameFontsStyle}
        dayNumberFontStyle={this.props.dayNumberFontStyle}
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
