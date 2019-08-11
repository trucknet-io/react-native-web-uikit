import React from "react";
import SignatureModal from "../../Containers/SignatureModalContainer";
import { boolean } from "@storybook/addon-knobs/react";
import { setRequiredProp } from "../Helpers";
import Container from "../Container";

const SignatureModalStory = () => (
  <Container>
    <SignatureModal
      isVisible={boolean(setRequiredProp(`isVisible`), true)}
      submitButtonLabel="ok"
      cancelButtonLabel="cancel"
    />
  </Container>
);

export default SignatureModalStory;
