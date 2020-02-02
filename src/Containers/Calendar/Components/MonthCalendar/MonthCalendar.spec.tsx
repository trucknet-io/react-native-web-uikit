import { render, waitForElement, fireEvent } from "@testing-library/react-native";
import * as React from "react";
import MonthCalendar from "./MonthCalendar";

it("should render April Calendar", async () => {
  const onDayPress = jest.fn();
  const { getByText } = render(<MonthCalendar currentDate={new Date("04/20/2020")} onDayPress={onDayPress} />);

  const firstDay = await waitForElement(() => getByText("1"));
  fireEvent.press(firstDay);
  expect(onDayPress).toHaveBeenCalledTimes(1);
  const lastDay = await waitForElement(() => getByText("30"));
  fireEvent.press(lastDay);
  expect(onDayPress).toHaveBeenCalledTimes(2);
});
