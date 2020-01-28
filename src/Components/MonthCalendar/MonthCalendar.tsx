import * as React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { TransparentButton } from "src/Components/Buttons";
import moment from "moment";
import getShadowStyle from "src/Themes/getShadowStyle";
import { ChevronLeft, ChevronRight } from "src/Components/Icons";
import colors, { colorTheme } from "src/Themes/Colors";
import { CalendarDay } from "./CalendarDay";

interface Props {
  isVisible: Boolean;
  onDayPress(day: Date): void;
  onNextMonthPress?(): void;
  onPreviousMonthPress?(): void;
  currentDate: Date;
  style?: ViewStyle;
  dayNumberFontStyle?: TextStyle;
  dayNameFontsStyle?: TextStyle;
  headerTextFontsStyle?: TextStyle;
  theme: "light" | "dark";
}

class MonthCalendar extends React.PureComponent<Props> {
  static defaultProps = {
    currentDate: new Date(),
    theme: "light",
  };
  public render() {
    if (!this.props.isVisible) return null;
    const themeColors = colorTheme[this.props.theme];
    return (
      <View style={[styles.container, { backgroundColor: themeColors.background }, this.props.style]}>
        <View style={styles.headerContainer}>
          <View style={styles.monthContainer}>
            <Text style={[{ color: themeColors.defaultText }, this.props.headerTextFontsStyle]}>
              {moment(this.props.currentDate).format("MMMM Y")}
            </Text>
          </View>
          <View style={styles.switchMonthButtonsContainer}>
            <TransparentButton
              style={[{ width: undefined }, this.props.headerTextFontsStyle]}
              onPress={this.props.onPreviousMonthPress}>
              <ChevronLeft color={themeColors.defaultText} />
            </TransparentButton>
            <TransparentButton
              style={[{ width: undefined }, this.props.headerTextFontsStyle]}
              onPress={this.props.onNextMonthPress}>
              <ChevronRight color={themeColors.defaultText} />
            </TransparentButton>
          </View>
        </View>
        <View style={styles.weekDaysContainer}>{this.renderWeekDayNames()}</View>
        <View style={styles.monthDaysContainer}>{this.renderMonthDayNumbers()}</View>
      </View>
    );
  }

  private renderWeekDayNames = () => {
    const weekDayNames: React.ReactNode[] = [];
    for (let i = 0; i < 7; i++) {
      weekDayNames.push(
        <View style={styles.dayContainer}>
          <Text style={[styles.weekDay, this.props.dayNameFontsStyle]}>
            {moment(this.props.currentDate)
              .startOf("week")
              .add(i, "days")
              .format("dd")}
          </Text>
        </View>,
      );
    }

    return weekDayNames;
  };

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
          day={new Date(day.toString())}
          currentDate={this.props.currentDate}
          theme={this.props.theme}
          onDayPress={this.props.onDayPress}
          dayNumberFontStyle={this.props.dayNumberFontStyle}
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
    ...getShadowStyle(12),
  },
  headerContainer: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: "7%" },
  monthContainer: { flex: 3, paddingVertical: 12 },
  switchMonthButtonsContainer: { flex: 1, flexDirection: "row", justifyContent: "space-between" },
  weekDaysContainer: { flexDirection: "row" },
  monthDaysContainer: { flexDirection: "row", flexWrap: "wrap" },
  dayContainer: {
    width: `${100 / 7}%`,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  activeDayContainer: {},
  weekDay: { color: colors.subtitle },
  monthDay: {
    minWidth: 24,
    minHeight: 24,
    lineHeight: 24,
    textAlign: "center",
    borderRadius: 12,
  },
});

export default MonthCalendar;
