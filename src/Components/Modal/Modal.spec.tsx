import { render } from "@testing-library/react-native";
import * as React from "react";
import Modal from "./Modal";
import { Text } from "react-native";

it("should not render modal if isVisible prop equal false", async () => {
  const { queryByText } = render(
    <Modal isVisible={false}>
      <Text>Modal</Text>
    </Modal>,
  );
  expect(queryByText("Modal", { exact: false })).toBeNull();
});

it("should render modal if isVisible prop equal true", async () => {
  const { getAllByText } = render(
    <Modal isVisible={true}>
      <Text>Modal</Text>
    </Modal>,
  );
  expect(getAllByText("Modal")).toHaveLength(1);
});
