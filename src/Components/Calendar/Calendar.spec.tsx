import { render, waitForElement } from "@testing-library/react-native";
import * as React from "react";
import Calendar from "./Calendar";

it("should render not Calendar", async () => {
  const { queryByText } = render(
    <Calendar isVisible={false} currentDate={new Date("04/20/2020")} onDayPress={() => {}} />,
  );
  const CalendarText = queryByText("April", { exact: false });
  expect(CalendarText).toBeNull();
});

it("should render April Calendar", async () => {
  const { queryByText } = render(<Calendar isVisible currentDate={new Date("04/20/2020")} onDayPress={() => {}} />);
  const monthName = queryByText("April", { exact: false });
  expect(monthName).toBeTruthy();
  const dayName = waitForElement(() => queryByText("Mo"));
  expect(dayName).toBeTruthy();
  const firstDay = waitForElement(() => queryByText("1"));
  expect(firstDay).toBeTruthy();
  const lastDay = waitForElement(() => queryByText("31"));
  expect(lastDay).toBeTruthy();
});
