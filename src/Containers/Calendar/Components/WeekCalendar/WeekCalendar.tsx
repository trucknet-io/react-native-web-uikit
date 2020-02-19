import * as React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import CalendarDay from "src/Containers/Calendar/Components/CalendarDay";
import moment from "moment";
import withTheme, { ThemeProps } from "src/Themes/withTheme";

interface DefaultProps {
  currentDate: Date;
  fontSize: number;
}

interface Props extends DefaultProps, ThemeProps {
  onDayPress(date: Date): void;
  style?: ViewStyle;
}

export class CalendarComponent extends React.PureComponent<Props> {
  static defaultProps: DefaultProps = {
    currentDate: new Date(),
    fontSize: 14,
  };

  public render() {
    const weekDays = this.getWeekDays();
    return <View style={[styles.container, this.props.style]}>{weekDays.map(this.renderDay)}</View>;
  }

  private renderDay = (day) => {
    return (
      <CalendarDay
        day={new Date(day.toString())}
        key={day.toString()}
        currentDate={this.props.currentDate}
        onDayPress={this.props.onDayPress}
        type="week"
        fontSize={this.props.fontSize}
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

export default withTheme<Props, DefaultProps>()(CalendarComponent);
