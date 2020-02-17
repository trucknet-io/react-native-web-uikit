import { render, fireEvent } from "@testing-library/react-native";
import * as React from "react";
import MonthCalendar from "./MonthCalendar";

it("should render April Calendar", async () => {
  const onDayPress = jest.fn();
  const { findByText } = render(<MonthCalendar currentDate={new Date("04/20/2020")} onDayPress={onDayPress} />);

  const FirstDay = await findByText("1");
  fireEvent.press(FirstDay);
  expect(onDayPress).toHaveBeenCalledTimes(1);
  const LastDay = await findByText("30");
  fireEvent.press(LastDay);
  expect(onDayPress).toHaveBeenCalledTimes(2);
});
