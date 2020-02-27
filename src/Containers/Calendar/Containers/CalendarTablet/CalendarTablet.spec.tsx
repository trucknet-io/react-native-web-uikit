import { render, fireEvent } from "@testing-library/react-native";
import * as React from "react";
import CalendarTablet from "./CalendarTablet";

it("should render Week Calendar", async () => {
  const onDateChange = jest.fn();
  const { findByText } = render(
    <CalendarTablet
      currentDate={new Date("04/21/2020")}
      onDateChange={onDateChange}
      submitLabel="Ok"
      cancelLabel="cancel"
    />,
  );
  await findByText("Su");
  await findByText("Sa");
});

it("should toggle Month Calendar", async () => {
  const onDateChange = jest.fn();
  const { getByLabelText, findByText } = render(
    <CalendarTablet
      currentDate={new Date("04/21/2020")}
      onDateChange={onDateChange}
      submitLabel="Ok"
      cancelLabel="cancel"
    />,
  );
  const ToggleMonthButton = getByLabelText("toggleMonthCalendar");
  fireEvent.press(ToggleMonthButton);
  await findByText("1");
  await findByText("30");
});

it("should switch to next month", async () => {
  const onDateChange = jest.fn();
  const { getByLabelText, findByText } = render(
    <CalendarTablet
      currentDate={new Date("04/21/2020")}
      onDateChange={onDateChange}
      submitLabel="Ok"
      cancelLabel="cancel"
    />,
  );

  const ToggleMonthButton = getByLabelText("toggleMonthCalendar");
  fireEvent.press(ToggleMonthButton);
  const NextMonthButton = getByLabelText("nextMonth");
  fireEvent.press(NextMonthButton);
  expect(onDateChange).toHaveBeenCalledTimes(0);
  const SubmitButton = getByLabelText("submit");
  fireEvent.press(SubmitButton);
  expect(onDateChange).toHaveBeenCalledTimes(1);
  await findByText("May", { exact: false });
});

it("should switch to previous month", async () => {
  const onDateChange = jest.fn();
  const { getByLabelText, findByText } = render(
    <CalendarTablet
      currentDate={new Date("04/21/2020")}
      onDateChange={onDateChange}
      submitLabel="Ok"
      cancelLabel="cancel"
    />,
  );

  const ToggleMonthButton = getByLabelText("toggleMonthCalendar");
  fireEvent.press(ToggleMonthButton);
  const PrevMonthButton = getByLabelText("prevMonth");
  fireEvent.press(PrevMonthButton);
  const SubmitButton = getByLabelText("submit");
  fireEvent.press(SubmitButton);
  expect(onDateChange).toHaveBeenCalledTimes(1);
  await findByText("March", { exact: false });
});

it("should not change data on cancel", async () => {
  const onDateChange = jest.fn();
  const { getByLabelText, findByText } = render(
    <CalendarTablet
      currentDate={new Date("04/21/2020")}
      onDateChange={onDateChange}
      submitLabel="Ok"
      cancelLabel="cancel"
    />,
  );
  const ToggleMonthButton = getByLabelText("toggleMonthCalendar");
  fireEvent.press(ToggleMonthButton);
  const Day = await findByText("1");
  fireEvent.press(Day);
  const CancelButton = getByLabelText("cancel");
  fireEvent.press(CancelButton);
  expect(onDateChange).toHaveBeenCalledTimes(0);
});
