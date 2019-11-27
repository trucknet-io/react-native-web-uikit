import { StyleSheet } from "react-native";
import Colors from "src/Themes/Colors";
import getShadowStyle from "src/Themes/getShadowStyle";

export const styles = StyleSheet.create({
  linearGradient: {
    ...getShadowStyle(),
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 12,
  },
  buttonText: {
    color: Colors.buttonText,
  },
  buttonLabel: {
    color: Colors.buttonText,
  },
  buttonLinkText: {
    textDecorationLine: "underline",
    color: Colors.buttonText,
  },
  text: {
    color: Colors.buttonText,
  },
  buttonDefaultStyles: {},
});
