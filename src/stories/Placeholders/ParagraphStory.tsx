import React from "react";
import Paragraph from "../../Components/Placeholders/Paragraph";
import { number } from "@storybook/addon-knobs/react";
import { setOptionalProp } from "../Helpers";
import Container from "../Container";

const ParagraphStory = () => {
  return (
    <Container>
      <Paragraph lines={number(setOptionalProp("lines"), 10)} />
    </Container>
  );
};

export default ParagraphStory;
