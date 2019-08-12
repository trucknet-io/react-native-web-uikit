import React from "react";
import { View } from "react-native";
import Input from "../../Components/Input";
import { boolean, color, text, number } from "@storybook/addon-knobs/react";
import { setRequiredProp, setOptionalProp } from "../Helpers";
import Container from "../Container";
import Colors from "../../Themes/Colors";

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
        onSuccessInputFieldColor={color(setOptionalProp("fieldColor"), Colors.lime)}
        onInputFocus={() => console.log("focus")}
        onInputBlur={() => console.log("blur")}
        keyboardType={text(setOptionalProp("keyboardType"), "default")}
        secureTextEntry={boolean(setOptionalProp("secureTextEntry"), false)}
      />
    </View>
  </Container>
);

export default InputFieldStory;
