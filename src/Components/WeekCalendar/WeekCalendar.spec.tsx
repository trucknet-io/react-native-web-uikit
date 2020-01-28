import { render, waitForElement } from "@testing-library/react-native";
import * as React from "react";
import WeekCalendar from "./WeekCalendar";

it("should render Week Days", async () => {
  const { queryByText } = render(<WeekCalendar currentDate={new Date("04/21/2020")} onDayPress={() => {}} />);
  const firstDayName = waitForElement(() => queryByText("Su"));
  expect(firstDayName).toBeTruthy();
  const lastDayName = waitForElement(() => queryByText("Sa"));
  expect(lastDayName).toBeTruthy();
});

it("should render Week Days Numbers", async () => {
  const { queryByText } = render(<WeekCalendar currentDate={new Date("04/21/2020")} onDayPress={() => {}} />);
  const firstDay = waitForElement(() => queryByText("21"));
  expect(firstDay).toBeTruthy();
  const lastDay = waitForElement(() => queryByText("27"));
  expect(lastDay).toBeTruthy();
});
