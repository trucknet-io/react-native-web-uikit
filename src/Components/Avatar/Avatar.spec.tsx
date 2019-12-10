import { render } from "@testing-library/react-native";
import * as React from "react";
import Avatar from "./Avatar";

it("should render avatar with an image", async () => {
  const imageId = "imageId";
  const { findByLabelText } = render(<Avatar imageId={imageId} accessibilityLabel="avatar" />);
  const avatarImage = await findByLabelText("avatar");
  expect(avatarImage).toBeDefined();
});

it("should render avatar with 1st letter of a name", async () => {
  const { findAllByText } = render(<Avatar name="Avatar" accessibilityLabel="avatar" />);
  const avatarText = await findAllByText("A");
  expect(avatarText).toHaveLength(1);
});
