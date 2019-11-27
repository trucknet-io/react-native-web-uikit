import Colors from "src/Themes/Colors";
import { styles } from "./styles";
import { ButtonProps } from "./commonTypes";

export const defaultButtonProps: ButtonProps = {
  borderRadius: 4,
  width: "100%",
  marginVertical: 0,
  marginHorizontal: 0,
  alignItems: "center",
  disabled: false,
  textColor: Colors.buttonText,
  style: styles.buttonDefaultStyles,
};
