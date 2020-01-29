import React from "react";
import { View, ViewStyle, StyleSheet, Text } from "react-native";
import MonthCalendar from "src/Components/MonthCalendar";
import WeekCalendar from "src/Components/WeekCalendar";
import moment from "moment";
import colors, { colorTheme } from "src/Themes/Colors";
import { TransparentButton } from "src/Components/Buttons";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Calendar } from "src/Components/Icons";
import getShadowStyle from "src/Themes/getShadowStyle";

type Props = {
  currentDate: Date;
  onDateChange(date: Date): void;
  theme: "dark" | "light";
  style?: ViewStyle;
  headerStyle?: ViewStyle;
  fontSize: number;
};

type State = {
  isMonthCalendarOpen: Boolean;
  currentDate: Date;
};

class CalendarContainer extends React.PureComponent<Props, State> {
  static defaultProps = {
    currentDate: new Date(),
    theme: "light",
    fontSize: 14,
  };

  public state = {
    isMonthCalendarOpen: false,
    currentDate: this.props.currentDate,
  };

  public render() {
    const themeColors = colorTheme[this.props.theme];
    const { fontSize } = this.props;
    return (
      <View
        key={this.props.currentDate.toString()}
        style={[styles.container, { backgroundColor: themeColors.background }, this.props.style]}>
        <View style={[styles.headerContainer, this.props.headerStyle]}>
          <TransparentButton
            style={[styles.monthContainer, { width: undefined }]}
            onPress={this.toggleCalendar}
            accessibilityLabel="toggleMonthCalendar">
            <Calendar color={themeColors.defaultText} width={fontSize} height={fontSize} />
            <Text style={[styles.month, { color: themeColors.defaultText, fontSize: this.props.fontSize }]}>
              {moment(this.state.currentDate).format("MMMM Y")}
            </Text>
            {this.state.isMonthCalendarOpen ? (
              <ChevronUp color={themeColors.defaultText} width={fontSize} height={fontSize} />
            ) : (
              <ChevronDown color={themeColors.defaultText} width={fontSize} height={fontSize} />
            )}
          </TransparentButton>
          {this.renderSwitchMonthButtons()}
        </View>
        <View style={styles.weekDaysContainer}>{this.renderWeekDayNames()}</View>
        {this.state.isMonthCalendarOpen ? (
          <MonthCalendar {...this.props} currentDate={this.state.currentDate} onDayPress={this.handleDayPress} />
        ) : (
          <WeekCalendar {...this.props} currentDate={this.state.currentDate} onDayPress={this.handleDayPress} />
        )}
      </View>
    );
  }

  private toggleCalendar = () => this.setState({ isMonthCalendarOpen: !this.state.isMonthCalendarOpen });
  private handleDayPress = (date: Date) => this.setState({ currentDate: date }, this.handleDateChange);
  private handlePreviousMonthPress = () =>
    this.setState(
      {
        currentDate: new Date(
          moment(this.state.currentDate)
            .add(-1, "month")
            .startOf("month")
            .toString(),
        ),
      },
      this.handleDateChange,
    );
  private handleNextMonthPress = () =>
    this.setState(
      {
        currentDate: new Date(
          moment(this.state.currentDate)
            .add(1, "month")
            .startOf("month")
            .toString(),
        ),
      },
      this.handleDateChange,
    );

  private handleDateChange = () => this.props.onDateChange(this.state.currentDate);

  private renderSwitchMonthButtons = () => {
    if (!this.state.isMonthCalendarOpen) return null;
    const themeColors = colorTheme[this.props.theme];
    const { fontSize } = this.props;
    return (
      <View style={styles.switchMonthButtonsContainer}>
        <TransparentButton
          style={{ width: undefined }}
          onPress={this.handlePreviousMonthPress}
          accessibilityLabel="prevMonth">
          <ChevronLeft color={themeColors.defaultText} width={fontSize} height={fontSize} />
        </TransparentButton>
        <TransparentButton
          style={{ width: undefined }}
          onPress={this.handleNextMonthPress}
          accessibilityLabel="nextMonth">
          <ChevronRight color={themeColors.defaultText} width={fontSize} height={fontSize} />
        </TransparentButton>
      </View>
    );
  };

  private renderWeekDayNames = () => {
    const weekDayNames: React.ReactNode[] = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = moment(this.props.currentDate)
        .startOf("week")
        .add(i, "days")
        .format("dd");
      weekDayNames.push(
        <View style={styles.dayContainer} key={currentDay}>
          <Text style={[styles.weekDay, { fontSize: this.props.fontSize - 2 }]}>{currentDay}</Text>
        </View>,
      );
    }

    return weekDayNames;
  };
}

const styles = StyleSheet.create({
  container: {
    ...getShadowStyle(6),
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: "6%",
  },
  monthContainer: {
    flex: 3,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  month: { marginHorizontal: 8 },
  switchMonthButtonsContainer: { flex: 1, flexDirection: "row", justifyContent: "space-between" },
  weekDaysContainer: { flexDirection: "row" },
  weekDay: { color: colors.subtitle },
  dayContainer: { flexBasis: `${100 / 7}%`, alignItems: "center", justifyContent: "center" },
});

export default CalendarContainer;
