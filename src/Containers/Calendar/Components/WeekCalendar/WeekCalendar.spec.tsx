import { render, fireEvent } from "@testing-library/react-native";
import * as React from "react";
import WeekCalendar from "./WeekCalendar";

it("should render Week Days Numbers", async () => {
  const onDayPress = jest.fn();
  const { findByText } = render(<WeekCalendar currentDate={new Date("04/21/2020")} onDayPress={onDayPress} />);
  const FirstDay = await findByText("19");
  fireEvent.press(FirstDay);
  expect(onDayPress).toHaveBeenCalledTimes(1);
  const LastDay = await findByText("25");
  fireEvent.press(LastDay);
  expect(onDayPress).toHaveBeenCalledTimes(2);
});
