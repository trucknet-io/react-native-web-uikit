import React from "react";
import ColorsGallery from "src/Components/ColorsGallery";
import { select } from "@storybook/addon-knobs/react";
import { setOptionalProp } from "src/stories/Helpers";
import Container from "src/stories/Container";

const SignatureModalStory = () => {
  return (
    <Container>
      <ColorsGallery theme={select(setOptionalProp("theme"), { light: "light", dark: "dark" }, "light")} />
    </Container>
  );
};

export default SignatureModalStory;
