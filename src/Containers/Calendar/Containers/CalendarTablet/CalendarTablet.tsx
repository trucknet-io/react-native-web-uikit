import * as React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import MonthCalendar from "../MonthCalendar";
import WeekCalendar from "src/Containers/Calendar/Components/WeekCalendar";
import CurrentMonth from "src/Containers/Calendar/Components/CurrentMonth";
import WeekDays from "src/Containers/Calendar/Components/WeekDays";
import getShadowStyle from "src/Themes/getShadowStyle";
import CalendarWrapper, { CalendarParamsTypes } from "src/Containers/Calendar/Wrappers/CalendarWrapper";
import { calendarPaddingHorizontal } from "src/Containers/Calendar/variables";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

interface DefaultProps {
  currentDate: Date;
}

type Styles = ReturnType<typeof getStyles>;

interface Props extends ThemeProps<Styles>, DefaultProps {
  onDateChange(date: Date): void;
  style?: ViewStyle;
  calendarStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  submitLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
}

export class PureCalendarTablet extends React.PureComponent<Props> {
  static defaultProps = {
    currentDate: new Date(),
  };

  public render() {
    return (
      <CalendarWrapper
        currentDate={this.props.currentDate}
        render={this.renderCalendar}
        onDateChange={this.props.onDateChange}
        styles={this.props.styles}
      />
    );
  }

  private handleSubmit = (methods: CalendarParamsTypes["methods"]) => (date: Date) => {
    methods.toggleCalendar();
    methods.handleDayPress(date);
  };

  private renderCalendar = ({ state, methods, styles }: CalendarParamsTypes<Styles>) => {
    const handleSubmit = this.handleSubmit(methods);
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
          </View>
          <WeekDays currentDate={state.currentDate} />
          <WeekCalendar currentDate={state.currentDate} onDayPress={methods.handleDayPress} fontSize={18} />
        </View>
        <View style={[styles.calendarContainer, this.props.calendarStyle]}>
          {state.isOpen ? (
            <MonthCalendar
              key={state.currentDate.toString()}
              currentDate={state.currentDate}
              submit={{ onSubmit: handleSubmit, submitLabel: this.props.submitLabel }}
              cancel={{ onCancel: methods.toggleCalendar, cancelLabel: this.props.cancelLabel }}
            />
          ) : null}
        </View>
      </View>
    );
  };
}

const getStyles = ({ colors, variables: { size } }: ThemeParamsType) =>
  StyleSheet.create({
    container: { backgroundColor: colors.background },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: size.s,
      paddingHorizontal: calendarPaddingHorizontal,
    },
    calendarContainer: {
      position: "absolute",
      top: "25%",
      left: "105%",
      backgroundColor: colors.background,
      borderRadius: size.xs,
      minWidth: 328,
      ...getShadowStyle(size.m),
    },
    monthContainer: { flex: 3 },
    switchButtonsContainer: { flex: 1 },
    month: { paddingHorizontal: size.s },
  });

export default withTheme<Props, DefaultProps>(getStyles)(PureCalendarTablet);
