import React from "react";
import { View } from "react-native";
import Input from "../../Components/Input";
import { boolean, color, text, number } from "@storybook/addon-knobs/react";
import { setRequiredProp, setOptionalProp } from "../Helpers";
import Container from "../Container";
import Colors from "../../Themes/Colors";
import { isWeb } from "../../Helpers/platform";

const InputFieldStory = () => (
  <Container>
    <View style={{ width: "100%", padding: "15%" }}>
      <Input
        label={text(setRequiredProp("label"), "label")}
        onChange={(value) => console.log(value)}
        width={text(setOptionalProp("width"), "100%")}
        height={number(setOptionalProp("height"), 84)}
        initialValue={text(setOptionalProp("initialValue"), "lol")}
        validateValue={(value) => (value.length < 8 ? "to short" : undefined)}
        textColor={color(setOptionalProp("textColor"), Colors.defaultText)}
        onSuccessInputFieldColor={color(setOptionalProp("fieldColor"), Colors.lime)}
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

export default InputFieldStory;
