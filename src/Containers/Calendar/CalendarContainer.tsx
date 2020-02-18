import React from "react";
import { ViewStyle } from "react-native";
import CalendarTablet from "./Containers/CalendarTablet";
import Calendar from "./Containers/Calendar";
import Device from "react-native-device-detection";
import withTheme, { ThemeParamsType } from "src/Themes/withTheme";

interface Props extends ThemeParamsType {
  currentDate: Date;
  onDateChange(date: Date): void;
  submitLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  style?: ViewStyle;
  calendarStyle?: ViewStyle;
}

class CalendarContainer extends React.PureComponent<Props> {
  public render() {
    const key = this.props.currentDate.toString();
    if (Device.isTablet) {
      return <CalendarTablet {...this.props} key={key} />;
    }
    return <Calendar {...this.props} key={key} />;
  }
}

export default withTheme<Props>()(CalendarContainer);