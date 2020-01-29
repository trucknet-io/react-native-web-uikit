import { render, waitForElement } from "@testing-library/react-native";
import * as React from "react";
import WeekCalendar from "./WeekCalendar";

it("should render Week Days Numbers", async () => {
  const { getByText } = render(<WeekCalendar currentDate={new Date("04/21/2020")} onDayPress={() => {}} />);
  const firstDay = await waitForElement(() => getByText("19"));
  expect(firstDay).toBeTruthy();
  const lastDay = await waitForElement(() => getByText("25"));
  expect(lastDay).toBeTruthy();
});
