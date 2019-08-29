import React from "react";
import { View } from "react-native";
import Input from "src/Components/Input";
import { boolean, color, text, number } from "@storybook/addon-knobs/react";
import { setRequiredProp, setOptionalProp } from "src/stories/Helpers";
import Container from "src/stories/Container";
import Colors from "src/Themes/Colors";
import { isWeb } from "src/Helpers/platform";

const InputFieldStory = () => (
  <Container>
    <View style={{ width: "100%", padding: "15%" }}>
      <Input
        label={text(setRequiredProp("label"), "label")}
        onChange={(value) => console.log(value)}
        width={text(setOptionalProp("width"), "100%")}
        height={number(setOptionalProp("height"), 84)}
        initialValue={text(setOptionalProp("initialValue"), "lol")}
        validateValue={validateValue}
        textColor={color(setOptionalProp("textColor"), Colors.defaultText)}
        onSuccessInputFieldColor={color(setOptionalProp("fieldColor"), Colors.themeColor)}
        onFocus={() => console.log("focus")}
        onBlur={() => console.log("blur")}
        keyboardType={text(setOptionalProp("keyboardType"), "default")}
        secureTextEntry={boolean(setOptionalProp("secureTextEntry"), false)}
        maxLabelFontSize={number(setOptionalProp("maxLabelFontSize"), 16)}
        minLabelFontSize={number(setOptionalProp("minLabelFontSize"), 12)}
        maxLabelMarginBottom={number(setOptionalProp("maxLabelMarginBottom"), isWeb ? 16 : 0)}
        minLabelMarginBottom={number(setOptionalProp("minLabelMarginBottom"), isWeb ? -24 : -34)}
        inputFontSize={number(setOptionalProp("inputFontSize"), 14)}
        errorFontSize={number(setOptionalProp("errorFontSize"), 12)}
        errorColor={color(setOptionalProp("errorColor"), Colors.error)}
        borderBottomWidth={number(setOptionalProp("borderBottomWidth"), 1)}
      />
    </View>
  </Container>
);

const validateValue = (value?: string) => {
  if (!value) {
    return "need some value";
  }
  return value.length < 8 ? "to short" : undefined;
};

export default InputFieldStory;
