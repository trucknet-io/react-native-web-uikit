import React from "react";

interface DefaultProps {
  currentDate: Date;
}

interface Props extends DefaultProps {
  onDateChange(date: Date): void;
  render(p: CalendarParamsTypes): React.ReactNode;
}

type State = {
  isOpen: boolean;
  currentDate: Date;
};

export type CalendarParamsTypes = {
  state: State;
  methods: {
    handleCalendarDateChange(date: Date): void;
    toggleCalendar(): void;
    handleDayPress(date: Date): void;
    handleDateChange(): void;
  };
};

export class CalendarWrapper extends React.PureComponent<Props, State> {
  static defaultProps = {
    currentDate: new Date(),
  };

  public state = {
    isOpen: false,
    currentDate: this.props.currentDate,
  };

  public render() {
    return this.props.render({
      state: this.state,
      methods: {
        handleCalendarDateChange: this.handleCalendarDateChange,
        toggleCalendar: this.toggleCalendar,
        handleDayPress: this.handleDayPress,
        handleDateChange: this.handleDateChange,
      },
    });
  }

  private handleCalendarDateChange = (date: Date) => {
    this.toggleCalendar();
    this.handleDayPress(date);
  };
  private toggleCalendar = () => this.setState({ isOpen: !this.state.isOpen });
  private handleDayPress = (date: Date) => this.setState({ currentDate: date }, this.handleDateChange);
  private handleDateChange = () => this.props.onDateChange(this.state.currentDate);
}

export default CalendarWrapper;
