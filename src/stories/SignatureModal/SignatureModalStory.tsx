import React from "react";
import SignatureModal from "src/Containers/SignatureModalContainer";
import { boolean, text, select } from "@storybook/addon-knobs/react";
import { setRequiredProp, setOptionalProp } from "src/stories/Helpers";
import Container from "src/stories/Container";

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
        theme={select(setOptionalProp("theme"), { light: "light", dark: "dark" }, "light")}
      />
    </Container>
  );
};

export default SignatureModalStory;
