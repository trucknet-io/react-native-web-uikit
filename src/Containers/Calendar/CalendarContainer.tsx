import React from "react";
import { ViewStyle } from "react-native";
import CalendarTablet from "./Containers/CalendarTablet";
import Calendar from "./Containers/Calendar";
import { isTablet } from "react-native-device-info";

type Props = {
  currentDate: Date;
  onDateChange(date: Date): void;
  theme: "dark" | "light";
  submitLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  style?: ViewStyle;
  calendarStyle?: ViewStyle;
};

class CalendarContainer extends React.PureComponent<Props> {
  public render() {
    const key = this.props.currentDate.toString();
    if (isTablet()) {
      return <CalendarTablet {...this.props} key={key} />;
    }
    return <Calendar {...this.props} key={key} />;
  }
}

export default CalendarContainer;
