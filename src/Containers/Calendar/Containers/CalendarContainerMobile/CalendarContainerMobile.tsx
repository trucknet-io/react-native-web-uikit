import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import MonthCalendar from "src/Containers/Calendar/Components/MonthCalendar";
import WeekCalendar from "src/Containers/Calendar/Components/WeekCalendar";
import { colorTheme } from "src/Themes/Colors";
import CurrentMonth from "../../Components/CurrentMonth";
import SwitchMonthButtons from "../../Components/SwitchMonthButtons";
import WeekDays from "../../Components/WeekDays";
import getShadowStyle from "src/Themes/getShadowStyle";

type Props = {
  currentDate: Date;
  onDateChange(date: Date): void;
  theme: "dark" | "light";
  style?: ViewStyle;
  calendarStyle?: ViewStyle;
};

type State = {
  isMonthCalendarOpen: Boolean;
  currentDate: Date;
};

class CalendarContainerMobile extends React.PureComponent<Props, State> {
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
            {this.state.isMonthCalendarOpen ? (
              <SwitchMonthButtons
                style={styles.switchButtonsContainer}
                theme={theme}
                currentDate={this.state.currentDate}
                onMonthChange={this.handleDayPress}
              />
            ) : null}
          </View>
          <WeekDays currentDate={this.state.currentDate} />
        </View>
        <View style={[styles.calendarContainer, { backgroundColor: themeColors.background }, this.props.calendarStyle]}>
          {this.renderCalendar()}
        </View>
      </View>
    );
  }

  private renderCalendar = () => {
    const calendarProps = {
      theme: this.props.theme,
      currentDate: this.state.currentDate,
      onDayPress: this.handleDayPress,
    };

    if (this.state.isMonthCalendarOpen) return <MonthCalendar {...calendarProps} />;
    return <WeekCalendar {...calendarProps} />;
  };

  private toggleCalendar = () => this.setState({ isMonthCalendarOpen: !this.state.isMonthCalendarOpen });
  private handleDayPress = (date: Date) => this.setState({ currentDate: date }, this.handleDateChange);

  private handleDateChange = () => this.props.onDateChange(this.state.currentDate);
}

const styles = StyleSheet.create({
  container: getShadowStyle(),
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: "6%",
  },
  monthContainer: { flex: 3 },
  switchButtonsContainer: { flex: 1 },
  calendarContainer: {
    position: "absolute",
    zIndex: 100,
    top: "101%",
    width: "100%",
    ...getShadowStyle(),
  },
});

export default CalendarContainerMobile;
