import React from "react";
import { ViewStyle } from "react-native";
import CalendarTablet from "./Containers/CalendarTablet";
import Calendar from "./Containers/Calendar";

type Props = {
  currentDate: Date;
  onDateChange(date: Date): void;
  submitLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  style?: ViewStyle;
  calendarStyle?: ViewStyle;
};

class CalendarContainer extends React.PureComponent<Props> {
  public render() {
    const key = this.props.currentDate.toString();
    if (false) {
      return <CalendarTablet {...this.props} key={key} />;
    }
    return <Calendar {...this.props} key={key} />;
  }
}

export default CalendarContainer;
