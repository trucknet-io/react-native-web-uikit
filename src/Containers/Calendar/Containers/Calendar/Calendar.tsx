import * as React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import MonthCalendar from "src/Containers/Calendar/Components/MonthCalendar";
import WeekCalendar from "src/Containers/Calendar/Components/WeekCalendar";
import CurrentMonth from "src/Containers/Calendar/Components/CurrentMonth";
import SwitchMonthButtons from "src/Containers/Calendar/Components/SwitchMonthButtons";
import WeekDays from "src/Containers/Calendar/Components/WeekDays";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";
import CalendarWrapper, { CalendarParamsTypes } from "src/Containers/Calendar/Wrappers/CalendarWrapper";
import { calendarPaddingHorizontal } from "src/Containers/Calendar/variables";

interface DefaultProps {
  currentDate: Date;
}

type Styles = ReturnType<typeof getStyles>;
interface Props extends ThemeProps<Styles>, DefaultProps {
  onDateChange(date: Date): void;
  style?: ViewStyle;
  headerStyle?: ViewStyle;
  calendarStyle?: ViewStyle;
}

export class PureCalendarContainer extends React.PureComponent<Props> {
  static defaultProps = {
    currentDate: new Date(),
  };

  public render() {
    return (
      <CalendarWrapper
        key={this.props.currentDate.toString()}
        currentDate={this.props.currentDate}
        render={this.renderCalendar}
        onDateChange={this.props.onDateChange}
        styles={this.props.styles}
      />
    );
  }

  private renderCalendar = ({ state, methods, styles }: CalendarParamsTypes<Styles>) => {
    const calendarProps = {
      theme: this.props.theme,
      currentDate: state.currentDate,
      onDayPress: methods.handleDayPress,
    };

    return (
      <View>
        <View style={[styles.container, this.props.style]}>
          <View style={[styles.headerContainer, this.props.headerStyle]}>
            <CurrentMonth
              currentDate={state.currentDate}
              onPress={methods.toggleCalendar}
              isOpen={state.isOpen}
              style={styles.monthContainer}
            />
            {state.isOpen ? (
              <SwitchMonthButtons
                style={styles.switchButtonsContainer}
                currentDate={state.currentDate}
                onMonthChange={methods.handleDayPress}
              />
            ) : null}
          </View>
          <WeekDays currentDate={state.currentDate} />
        </View>
        <View style={[styles.calendarContainer, this.props.calendarStyle]}>
          {state.isOpen ? <MonthCalendar {...calendarProps} /> : <WeekCalendar {...calendarProps} />}
        </View>
      </View>
    );
  };
}

const getStyles = ({ colors, variables: { size, shadow } }: ThemeParamsType) =>
  StyleSheet.create({
    container: { backgroundColor: colors.background },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: size.s,
      paddingHorizontal: calendarPaddingHorizontal,
    },
    monthContainer: { flex: 3 },
    switchButtonsContainer: { flex: 1 },
    calendarContainer: {
      position: "absolute",
      top: "101%",
      width: "100%",
      backgroundColor: colors.background,
      ...shadow,
    },
  });

export default withTheme<Props, DefaultProps>(getStyles)(PureCalendarContainer);
