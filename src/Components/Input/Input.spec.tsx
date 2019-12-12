import { render, fireEvent } from "@testing-library/react-native";
import * as React from "react";
import Input from "./Input";

it("should render Input with error text component", async () => {
  const { getByText, findByLabelText, queryByText } = render(
    <Input
      label="email"
      onChangeTextValidated={jest.fn()}
      validateValue={(value: string) => (value.length < 4 ? "error" : undefined)}
      textInputProps={{ accessibilityLabel: "email" }}
    />,
  );
  expect(getByText("email")).toBeDefined();
  const input = await findByLabelText("email");
  fireEvent.changeText(input, "inp");
  const error = await queryByText("error");
  expect(error).toBeDefined();
});

it("should render Input without error text component", async () => {
  const { getByText, findByLabelText, queryByText } = render(
    <Input
      label="email"
      onChangeTextValidated={jest.fn()}
      validateValue={(value: string) => (value.length < 4 ? "error" : undefined)}
      textInputProps={{ accessibilityLabel: "email" }}
    />,
  );
  expect(getByText("email")).toBeDefined();
  const input = await findByLabelText("email");
  fireEvent.changeText(input, "onChangeText");
  expect(queryByText("error")).toBeNull();
});
