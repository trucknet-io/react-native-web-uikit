import { render, fireEvent } from "@testing-library/react-native";
import * as React from "react";
import Calendar from "./Calendar";

it("should render Week Calendar", async () => {
  const onDateChange = jest.fn();
  const { findByText } = render(<Calendar currentDate={new Date("04/21/2020")} onDateChange={onDateChange} />);
  await findByText("Su");
  await findByText("Sa");
});

it("should toggle Month Calendar", async () => {
  const onDateChange = jest.fn();
  const { getByLabelText, findByText } = render(
    <Calendar currentDate={new Date("04/21/2020")} onDateChange={onDateChange} />,
  );
  const ToggleMonthButton = getByLabelText("toggleMonthCalendar");
  fireEvent.press(ToggleMonthButton);
  await findByText("1");
  await findByText("30");
});

it("should switch to next month", async () => {
  const onDateChange = jest.fn();
  const { getByLabelText, findByText } = render(
    <Calendar currentDate={new Date("04/21/2020")} onDateChange={onDateChange} />,
  );
  const ToggleMonthButton = getByLabelText("toggleMonthCalendar");
  fireEvent.press(ToggleMonthButton);
  const NextMonthButton = getByLabelText("nextMonth");
  fireEvent.press(NextMonthButton);
  expect(onDateChange).toHaveBeenCalledTimes(1);
  await findByText("May", { exact: false });
});

it("should switch to previous month", async () => {
  const onDateChange = jest.fn();
  const { getByLabelText, findByText } = render(
    <Calendar currentDate={new Date("04/21/2020")} onDateChange={onDateChange} />,
  );
  const ToggleMonthButton = getByLabelText("toggleMonthCalendar");
  fireEvent.press(ToggleMonthButton);
  const PrevMonthButton = getByLabelText("prevMonth");
  fireEvent.press(PrevMonthButton);
  expect(onDateChange).toHaveBeenCalledTimes(1);
  await findByText("March", { exact: false });
});
