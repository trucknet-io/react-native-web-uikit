import { TouchableOpacityProps, FlexAlignType, TextStyle } from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
  borderRadius: number;
  width: string | number;
  marginVertical: string | number;
  marginHorizontal: string | number;
  textColor: string;
  alignItems: FlexAlignType;
  label?: React.ReactNode;
  style?: TouchableOpacityProps["style"] & TextStyle;
}
