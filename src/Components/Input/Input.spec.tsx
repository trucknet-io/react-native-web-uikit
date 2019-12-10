import { render } from "@testing-library/react-native";
import * as React from "react";
import Input from "./Input";
import fireEvent from "__utils__/fireNativeEvent";

type Response = { value: string | undefined; isValid: boolean };
it("should render Input with error text component", async () => {
  const { getByText, findByLabelText, queryByText } = render(
    <Input
      label="email"
      onChangeTextValidated={(res: Response) => (res.value && res.value.length < 3 ? "error" : undefined)}
      textInputProps={{ accessibilityLabel: "input" }}
    />,
  );
  expect(getByText("email")).toBeDefined();
  const input = await findByLabelText("input");
  fireEvent(input, "onChangeText", "inp");
  expect(queryByText("error")).toBeDefined();
});

it("should render Input without error text component", async () => {
  const { getByText, findByLabelText, queryByText } = render(
    <Input
      label="email"
      onChangeTextValidated={(res: Response) => (res.value && res.value.length < 3 ? "error" : undefined)}
      textInputProps={{ accessibilityLabel: "input" }}
    />,
  );
  expect(getByText("email")).toBeDefined();
  const input = await findByLabelText("input");
  fireEvent(input, "onChangeText", "input");
  expect(queryByText("error")).toBeNull();
});
