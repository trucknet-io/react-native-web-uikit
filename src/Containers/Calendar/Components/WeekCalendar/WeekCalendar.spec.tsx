import { render, waitForElement, fireEvent } from "@testing-library/react-native";
import * as React from "react";
import WeekCalendar from "./WeekCalendar";

it("should render Week Days Numbers", async () => {
  const onDayPress = jest.fn();
  const { getByText } = render(<WeekCalendar currentDate={new Date("04/21/2020")} onDayPress={onDayPress} />);
  const firstDay = await waitForElement(() => getByText("19"));
  fireEvent.press(firstDay);
  expect(onDayPress).toHaveBeenCalledTimes(1);
  const lastDay = await waitForElement(() => getByText("25"));
  fireEvent.press(lastDay);
  expect(onDayPress).toHaveBeenCalledTimes(2);
});
