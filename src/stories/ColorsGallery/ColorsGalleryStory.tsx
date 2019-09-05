import React from "react";
import ColorsGallery from "../../Components/ColorsGallery";
import { select } from "@storybook/addon-knobs/react";
import { setOptionalProp } from "../Helpers";
import Container from "../Container";

const SignatureModalStory = () => {
  return (
    <Container>
      <ColorsGallery theme={select(setOptionalProp("theme"), { light: "light", dark: "dark" }, "light")} />
    </Container>
  );
};

export default SignatureModalStory;
