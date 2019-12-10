import { render } from "@testing-library/react-native";
import * as React from "react";
import CroppedThumbnail from "./CroppedThumbnail";

it("should render CroppedThumbnail", async () => {
  const imageId = "dk7o2yxitrwcsjz98fvk";
  const { findByLabelText } = render(
    <CroppedThumbnail imageId={imageId} options={{ width: 200 }} accessibilityLabel="image" />,
  );
  const image = await findByLabelText("image");
  expect(image).toMatchInlineSnapshot(`
<Image
  accessibilityLabel="image"
  accessible={true}
  imageId="dk7o2yxitrwcsjz98fvk"
  options={
    Object {
      "width": 200,
    }
  }
  source={
    Object {
      "uri": "https://res.cloudinary.com/trucknet/image/upload/f_auto,c_fit,w_200/dk7o2yxitrwcsjz98fvk",
    }
  }
  style={
    Array [
      Object {
        "height": undefined,
        "width": 200,
      },
      undefined,
    ]
  }
  uriCloudName="trucknet"
/>
`);
});
