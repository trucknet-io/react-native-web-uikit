import { render, waitForElement } from "@testing-library/react-native";
import * as React from "react";
import MonthCalendar from "./MonthCalendar";

it("should render April Calendar", async () => {
  const { getByText } = render(<MonthCalendar currentDate={new Date("04/20/2020")} onDayPress={() => {}} />);

  const firstDay = await waitForElement(() => getByText("1"));
  expect(firstDay).toBeTruthy();
  const lastDay = await waitForElement(() => getByText("30"));
  expect(lastDay).toBeTruthy();
});
