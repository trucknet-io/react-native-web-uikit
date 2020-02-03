import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import MonthCalendar from "../MonthCalendar";
import WeekCalendar from "src/Containers/Calendar/Components/WeekCalendar";
import CurrentMonth from "../../Components/CurrentMonth";
import WeekDays from "../../Components/WeekDays";
import getShadowStyle from "src/Themes/getShadowStyle";

import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

interface DefaultProps {
  currentDate: Date;
}

type Styles = ReturnType<typeof getStyles>;

interface Props extends ThemeProps<Styles>, DefaultProps {
  onDateChange(date: Date): void;
  style?: ViewStyle;
  calendarStyle?: ViewStyle;
  submitLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
}

type State = {
  isMonthCalendarOpen: Boolean;
  currentDate: Date;
};

class CalendarTablet extends React.PureComponent<Props, State> {
  static defaultProps = {
    currentDate: new Date(),
  };

  public state = {
    isMonthCalendarOpen: false,
    currentDate: this.props.currentDate,
  };

  public render() {
    const { styles } = this.props;
    return (
      <View>
        <View style={[styles.container, this.props.style]}>
          <View style={styles.headerContainer}>
            <CurrentMonth
              currentDate={this.state.currentDate}
              onPress={this.toggleCalendar}
              isMonthCalendarOpen={this.state.isMonthCalendarOpen}
              style={styles.monthContainer}
            />
          </View>
          <WeekDays currentDate={this.state.currentDate} />
          <WeekCalendar currentDate={this.state.currentDate} onDayPress={this.handleDayPress} fontSize={18} />
        </View>
        <View style={[styles.calendarContainer, this.props.calendarStyle]}>
          {this.state.isMonthCalendarOpen ? (
            <MonthCalendar
              key={this.state.currentDate.toString()}
              currentDate={this.state.currentDate}
              submit={{ onSubmit: this.handleCalendarDateChange, submitLabel: this.props.submitLabel }}
              cancel={{ onCancel: this.toggleCalendar, cancelLabel: this.props.cancelLabel }}
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

const getStyles = ({ colors }: ThemeParamsType) =>
  StyleSheet.create({
    container: { backgroundColor: colors.background },
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
      backgroundColor: colors.background,
      borderRadius: 6,
      width: 328,
      ...getShadowStyle(12),
    },
    monthContainer: { flex: 3 },
    switchButtonsContainer: { flex: 1 },
    month: { paddingHorizontal: 8 },
  });

export default withTheme<Props, DefaultProps>(getStyles)(CalendarTablet);
