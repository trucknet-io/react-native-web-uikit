import React from "react";
import SignatureModal from "../../Containers/SignatureModalContainer";
import { boolean, text, color } from "@storybook/addon-knobs/react";
import { setRequiredProp, setOptionalProp } from "../Helpers";
import Container from "../Container";

let isVisible = true;

const onBackdropPress = () => {
  console.log("onBackdropPress");
};

const onSignApply = (data) => {
  console.log(data);
};

const SignatureModalStory = () => {
  return (
    <Container>
      <SignatureModal
        isVisible={boolean(setRequiredProp(`isVisible`), isVisible)}
        onBackdropPress={onBackdropPress}
        onSignApply={onSignApply}
        submitButtonLabel={text(setOptionalProp("submitButtonLabel"), "ok")}
        cancelButtonLabel={text(setOptionalProp("cancelButtonLabel"), "cancel")}
        headerText={text(setOptionalProp("headerText"), "header")}
        helperText={text(setOptionalProp("helperText"), "do what u need to do")}
        backgroundColor={color(setOptionalProp("backgroundColor"), "#FFF")}
      />
    </Container>
  );
};

export default SignatureModalStory;
