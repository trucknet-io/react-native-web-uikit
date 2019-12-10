import { render } from "@testing-library/react-native";
import * as React from "react";
import CroppedThumbnail from "./CroppedThumbnail";

it("should render CroppedThumbnail", async () => {
  const imageId = "dk7o2yxitrwcsjz98fvk";
  const { findByLabelText } = render(
    <CroppedThumbnail imageId={imageId} fetchFormat="png" crop="crop" accessibilityLabel="image" />,
  );
  const image = await findByLabelText("image");
  expect(image).toMatchInlineSnapshot(`
<Image
  accessibilityLabel="image"
  accessible={true}
  source={
    Object {
      "uri": "https://res.cloudinary.com/trucknet/image/upload/f_png,c_crop/dk7o2yxitrwcsjz98fvk",
    }
  }
  style={
    Array [
      Object {
        "flexGrow": 1,
      },
      Object {
        "height": undefined,
        "width": undefined,
      },
      undefined,
    ]
  }
/>
`);
});

it("should render CroppedThumbnail with width 200", async () => {
  const imageId = "dk7o2yxitrwcsjz98fvk";
  const { findByLabelText } = render(<CroppedThumbnail imageId={imageId} width={200} accessibilityLabel="image" />);
  const image = await findByLabelText("image");
  expect(image).toMatchInlineSnapshot(`
<Image
  accessibilityLabel="image"
  accessible={true}
  source={
    Object {
      "uri": "https://res.cloudinary.com/trucknet/image/upload/f_auto,c_fit,w_200/dk7o2yxitrwcsjz98fvk",
    }
  }
  style={
    Array [
      Object {
        "flexGrow": 1,
      },
      Object {
        "height": undefined,
        "width": 200,
      },
      undefined,
    ]
  }
/>
`);
});

it("should render CroppedThumbnail with width and height 400", async () => {
  const imageId = "dk7o2yxitrwcsjz98fvk";
  const { findByLabelText } = render(
    <CroppedThumbnail imageId={imageId} width={400} height={400} crop="crop" accessibilityLabel="image" />,
  );
  const image = await findByLabelText("image");
  expect(image).toMatchInlineSnapshot(`
<Image
  accessibilityLabel="image"
  accessible={true}
  source={
    Object {
      "uri": "https://res.cloudinary.com/trucknet/image/upload/f_auto,c_crop,w_400,h_400/dk7o2yxitrwcsjz98fvk",
    }
  }
  style={
    Array [
      Object {
        "flexGrow": 1,
      },
      Object {
        "height": 400,
        "width": 400,
      },
      undefined,
    ]
  }
/>
`);
});
