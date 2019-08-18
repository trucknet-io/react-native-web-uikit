import { color, number, boolean } from "@storybook/addon-knobs/react";
import { setOptionalProp } from "../Helpers";
import { action } from "@storybook/addon-actions";
import Colors from "../../Themes/Colors";
import { isWeb } from "../../Helpers/platform";

const buttonProps = () => ({
  width: number(setOptionalProp("width"), isWeb ? 800 : "80%"),
  height: number(setOptionalProp("height"), 40),
  borderRadius: number(setOptionalProp("borderRadius"), 5),
  borderWidth: number(setOptionalProp("borderWidth"), 0),
  borderColor: color(setOptionalProp("borderColor"), Colors.borderColor),
  disabled: boolean(setOptionalProp("disabled"), false),
  onPressIn: action("onPressIn"),
  onPress: action("onPress"),
  onPressOut: action("onPressOut"),
  onLongPress: action("onLongPress"),
});

export default buttonProps;
