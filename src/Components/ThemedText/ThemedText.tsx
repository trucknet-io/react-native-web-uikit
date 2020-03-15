import * as React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Style = ReturnType<typeof getStyles>;

interface Props extends ThemeProps<Style>, TextProps {
  children: React.ReactNode;
}

export const PureThemedText = (props: Props) => (
  <Text style={[props.styles.text, props.style]} {...props}>
    {props.children}
  </Text>
);

const getStyles = ({ fonts }: ThemeParamsType) =>
  StyleSheet.create({
    text: fonts.BodyRegular,
  });

export default withTheme<Props>(getStyles)(PureThemedText);
