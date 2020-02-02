import { render, waitForElement, fireEvent } from "@testing-library/react-native";
import * as React from "react";
import Calendar from "./Calendar";

it("should render Week Calendar", async () => {
  const onDateChange = jest.fn();
  const { queryByText } = render(<Calendar currentDate={new Date("04/21/2020")} onDateChange={onDateChange} />);
  const firstDay = await waitForElement(() => queryByText("Su"));
  expect(firstDay).toBeTruthy();
  const lastDay = await waitForElement(() => queryByText("Sa"));
  expect(lastDay).toBeTruthy();
});

it("should toggle Month Calendar", async () => {
  const onDateChange = jest.fn();
  const { getByLabelText, getByText } = render(
    <Calendar currentDate={new Date("04/21/2020")} onDateChange={onDateChange} />,
  );
  const ToggleMonthButton = getByLabelText("toggleMonthCalendar");
  fireEvent.press(ToggleMonthButton);
  const firstDay = await waitForElement(() => getByText("1"));
  expect(firstDay).toBeTruthy();
  const lastDay = await waitForElement(() => getByText("30"));
  expect(lastDay).toBeTruthy();
});

it("should switch to next month", async () => {
  const onDateChange = jest.fn();
  const { getByLabelText, getByText } = render(
    <Calendar currentDate={new Date("04/21/2020")} onDateChange={onDateChange} />,
  );
  const ToggleMonthButton = getByLabelText("toggleMonthCalendar");
  fireEvent.press(ToggleMonthButton);
  const NextMonthButton = getByLabelText("nextMonth");
  fireEvent.press(NextMonthButton);
  expect(onDateChange).toHaveBeenCalledTimes(1);
  const month = await waitForElement(() => getByText("May", { exact: false }));
  expect(month).toBeTruthy();
});

it("should switch to previous month", async () => {
  const onDateChange = jest.fn();
  const { getByLabelText, getByText } = render(
    <Calendar currentDate={new Date("04/21/2020")} onDateChange={onDateChange} />,
  );
  const ToggleMonthButton = getByLabelText("toggleMonthCalendar");
  fireEvent.press(ToggleMonthButton);
  const PrevMonthButton = getByLabelText("prevMonth");
  fireEvent.press(PrevMonthButton);
  expect(onDateChange).toHaveBeenCalledTimes(1);
  const month = await waitForElement(() => getByText("March", { exact: false }));
  expect(month).toBeTruthy();
});
