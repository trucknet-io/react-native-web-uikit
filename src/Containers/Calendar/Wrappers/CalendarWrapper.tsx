import * as React from "react";

interface Props {
  onDateChange(date: Date): void;
  render(p: CalendarParamsTypes): React.ReactElement<unknown>;
  styles: unknown;
  currentDate: Date;
}

type State = {
  isOpen: boolean;
  currentDate: Date;
};

export type CalendarParamsTypes<S = unknown> = {
  state: State;
  methods: {
    toggleCalendar(): void;
    handleDayPress(date: Date): void;
    handleDateChange(): void;
  };
  styles: S;
};

const CalendarWrapper = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(props.currentDate);

  React.useEffect(
    () => {
      handleDayPress(props.currentDate);
    },
    [props.currentDate],
  );

  React.useEffect(
    () => {
      handleDateChange();
    },
    [currentDate],
  );
  const toggleCalendar = () => setIsOpen((isOpen) => !isOpen);
  const handleDayPress = (date: Date) => setCurrentDate(date);
  const handleDateChange = () => props.onDateChange(currentDate);
  return props.render({
    state: { isOpen, currentDate },
    methods: {
      toggleCalendar: toggleCalendar,
      handleDayPress: handleDayPress,
      handleDateChange: handleDateChange,
    },
    styles: props.styles,
  });
};

export default CalendarWrapper;
