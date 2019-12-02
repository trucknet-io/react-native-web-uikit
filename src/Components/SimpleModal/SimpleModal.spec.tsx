import { render } from "@testing-library/react-native";
import * as React from "react";
import { SimpleModal } from "./SimpleModal";
import { Text } from "react-native";

it("should not render modal if isVisible prop equal false", async () => {
  const { queryByText } = render(
    <SimpleModal isVisible={false}>
      <Text>Modal</Text>
    </SimpleModal>,
  );
  expect(queryByText("Modal", { exact: false })).toBeNull();
});

it("should render modal if isVisible prop equal true", async () => {
  const { getAllByText } = render(
    <SimpleModal isVisible={true}>
      <Text>Modal</Text>
    </SimpleModal>,
  );
  expect(getAllByText("Modal")).toHaveLength(1);
});
