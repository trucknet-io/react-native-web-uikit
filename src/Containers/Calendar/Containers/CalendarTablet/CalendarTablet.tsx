import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import MonthCalendar from "../MonthCalendar";
import WeekCalendar from "src/Containers/Calendar/Components/WeekCalendar";
import { colorTheme } from "src/Themes/Colors";
import CurrentMonth from "../../Components/CurrentMonth";
import WeekDays from "../../Components/WeekDays";
import getShadowStyle from "src/Themes/getShadowStyle";

type Props = {
  currentDate: Date;
  onDateChange(date: Date): void;
  theme: "dark" | "light";
  submitLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  style?: ViewStyle;
  calendarStyle?: ViewStyle;
};

type State = {
  isMonthCalendarOpen: Boolean;
  currentDate: Date;
};

class CalendarTablet extends React.PureComponent<Props, State> {
  static defaultProps = {
    currentDate: new Date(),
    theme: "light",
  };

  public state = {
    isMonthCalendarOpen: false,
    currentDate: this.props.currentDate,
  };

  public render() {
    const themeColors = colorTheme[this.props.theme];
    const { theme } = this.props;
    return (
      <View>
        <View style={[{ backgroundColor: themeColors.background }, this.props.style]}>
          <View style={styles.headerContainer}>
            <CurrentMonth
              theme={theme}
              currentDate={this.state.currentDate}
              onPress={this.toggleCalendar}
              isMonthCalendarOpen={this.state.isMonthCalendarOpen}
              style={styles.monthContainer}
            />
          </View>
          <WeekDays currentDate={this.state.currentDate} />
          <WeekCalendar
            currentDate={this.state.currentDate}
            theme={theme}
            onDayPress={this.handleDayPress}
            fontSize={18}
          />
        </View>
        <View style={[styles.calendarContainer, { backgroundColor: themeColors.background }, this.props.calendarStyle]}>
          {this.state.isMonthCalendarOpen ? (
            <MonthCalendar
              key={this.state.currentDate.toString()}
              currentDate={this.state.currentDate}
              submit={{ onSubmit: this.handleCalendarDateChange, submitLabel: this.props.submitLabel }}
              cancel={{ onCancel: this.toggleCalendar, cancelLabel: this.props.cancelLabel }}
              theme={theme}
            />
          ) : null}
        </View>
      </View>
    );
  }

  private handleCalendarDateChange = (date: Date) => {
    this.toggleCalendar();
    this.handleDayPress(date);
  };
  private toggleCalendar = () => this.setState({ isMonthCalendarOpen: !this.state.isMonthCalendarOpen });
  private handleDayPress = (date: Date) => this.setState({ currentDate: date }, this.handleDateChange);
  private handleDateChange = () => this.props.onDateChange(this.state.currentDate);
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: "6%",
  },
  calendarContainer: {
    position: "absolute",
    zIndex: 100,
    top: "25%",
    left: "105%",
    backgroundColor: "white",
    borderRadius: 6,
    width: 328,
    ...getShadowStyle(12),
  },
  monthContainer: { flex: 3 },
  switchButtonsContainer: { flex: 1 },
  month: { paddingHorizontal: 8 },
});

export default CalendarTablet;
