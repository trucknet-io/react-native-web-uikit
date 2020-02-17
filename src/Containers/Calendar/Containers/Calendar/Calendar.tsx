import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import MonthCalendar from "src/Containers/Calendar/Components/MonthCalendar";
import WeekCalendar from "src/Containers/Calendar/Components/WeekCalendar";
import CurrentMonth from "../../Components/CurrentMonth";
import SwitchMonthButtons from "../../Components/SwitchMonthButtons";
import WeekDays from "../../Components/WeekDays";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

interface DefaultProps {
  currentDate: Date;
}

type Styles = ReturnType<typeof getStyles>;
interface Props extends ThemeProps<Styles>, DefaultProps {
  onDateChange(date: Date): void;
  style?: ViewStyle;
  calendarStyle?: ViewStyle;
}

type State = {
  isMonthCalendarOpen: Boolean;
  currentDate: Date;
};

class CalendarContainerMobile extends React.PureComponent<Props, State> {
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
              isOpen={this.state.isMonthCalendarOpen}
              style={styles.monthContainer}
            />
            {this.state.isMonthCalendarOpen ? (
              <SwitchMonthButtons
                style={styles.switchButtonsContainer}
                currentDate={this.state.currentDate}
                onMonthChange={this.handleDayPress}
              />
            ) : null}
          </View>
          <WeekDays currentDate={this.state.currentDate} />
        </View>
        <View style={[styles.calendarContainer, this.props.calendarStyle]}>{this.renderCalendar()}</View>
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

const getStyles = ({ colors, variables: { size, shadow } }: ThemeParamsType) =>
  StyleSheet.create({
    container: { backgroundColor: colors.background },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 14,
      paddingHorizontal: size.calendarPaddingHorizontal,
    },
    monthContainer: { flex: 3 },
    switchButtonsContainer: { flex: 1 },
    calendarContainer: {
      position: "absolute",
      zIndex: 100,
      top: "101%",
      width: "100%",
      backgroundColor: colors.background,
      ...shadow,
    },
  });

export default withTheme<Props, DefaultProps>(getStyles)(CalendarContainerMobile);
