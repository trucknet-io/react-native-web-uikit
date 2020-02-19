import * as React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import MonthCalendar from "src/Containers/Calendar/Components/MonthCalendar";
import WeekCalendar from "src/Containers/Calendar/Components/WeekCalendar";
import CurrentMonth from "../../Components/CurrentMonth";
import SwitchMonthButtons from "../../Components/SwitchMonthButtons";
import WeekDays from "../../Components/WeekDays";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";
import CalendarWrapper, { CalendarParamsTypes } from "../../Wrappers/CalendarWrapper";

interface DefaultProps {
  currentDate: Date;
}

type Styles = ReturnType<typeof getStyles>;
interface Props extends ThemeProps<Styles>, DefaultProps {
  onDateChange(date: Date): void;
  style?: ViewStyle;
  calendarStyle?: ViewStyle;
}

export class CalendarContainerMobileComponent extends React.PureComponent<Props> {
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
      />
    );
  }

  private renderCalendar = ({ state, methods }: CalendarParamsTypes) => {
    const { styles } = this.props;
    const calendarProps = {
      theme: this.props.theme,
      currentDate: state.currentDate,
      onDayPress: methods.handleDayPress,
    };

    return (
      <View>
        <View style={[styles.container, this.props.style]}>
          <View style={styles.headerContainer}>
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
      paddingVertical: size.m,
      paddingHorizontal: size.calendarPaddingHorizontal,
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

export default withTheme<Props, DefaultProps>(getStyles)(CalendarContainerMobileComponent);
