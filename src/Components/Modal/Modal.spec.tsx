import { render, waitForElement } from "@testing-library/react-native";
import * as React from "react";
import Modal from "./Modal";
import { Text } from "react-native";

it("should not render modal if isVisible prop equal false", async () => {
  const { queryByText } = render(
    <Modal isVisible={false} animationInTiming={0}>
      <Text>Modal</Text>
    </Modal>,
  );
  const modalText = queryByText("Modal", { exact: false });
  expect(modalText).toBeNull();
});

it("should render modal if isVisible prop equal true", async () => {
  const { getAllByText } = render(
    <Modal isVisible={true}>
      <Text>Modal</Text>
    </Modal>,
  );

  const modalText = await waitForElement(() => getAllByText("Modal"));
  expect(modalText).toHaveLength(1);
});
