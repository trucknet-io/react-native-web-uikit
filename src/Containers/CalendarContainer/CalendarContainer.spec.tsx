import { render, waitForElement, fireEvent } from "@testing-library/react-native";
import * as React from "react";
import CalendarContainer from "./CalendarContainer";

it("should render Week Calendar", async () => {
  const { queryByText } = render(<CalendarContainer currentDate={new Date("04/21/2020")} onDateChange={() => {}} />);
  const firstDay = await waitForElement(() => queryByText("Su"));
  expect(firstDay).toBeTruthy();
  const lastDay = await waitForElement(() => queryByText("Sa"));
  expect(lastDay).toBeTruthy();
});

it("should render Month Calendar", async () => {
  const { getByLabelText, getByText } = render(
    <CalendarContainer currentDate={new Date("04/21/2020")} onDateChange={() => {}} />,
  );
  const ToggleMonthButton = getByLabelText("toggleMonthCalendar");
  fireEvent.press(ToggleMonthButton);
  const firstDay = await waitForElement(() => getByText("1"));
  expect(firstDay).toBeTruthy();
  const lastDay = await waitForElement(() => getByText("30"));
  expect(lastDay).toBeTruthy();
});

it("should switch to next month", async () => {
  const { getByLabelText, getByText } = render(
    <CalendarContainer currentDate={new Date("04/21/2020")} onDateChange={() => {}} />,
  );
  const ToggleMonthButton = getByLabelText("toggleMonthCalendar");
  fireEvent.press(ToggleMonthButton);
  const NextMonthButton = getByLabelText("nextMonth");
  fireEvent.press(NextMonthButton);
  const month = await waitForElement(() => getByText("May", { exact: false }));
  expect(month).toBeTruthy();
});

it("should switch to previous month", async () => {
  const { getByLabelText, getByText } = render(
    <CalendarContainer currentDate={new Date("04/21/2020")} onDateChange={() => {}} />,
  );
  const ToggleMonthButton = getByLabelText("toggleMonthCalendar");
  fireEvent.press(ToggleMonthButton);
  const PrevMonthButton = getByLabelText("prevMonth");
  fireEvent.press(PrevMonthButton);
  const month = await waitForElement(() => getByText("March", { exact: false }));
  expect(month).toBeTruthy();
});
