import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import withTheme, { ThemeProps } from "src/Themes/withTheme";

type Style = ReturnType<typeof getStyles>;

interface Props extends ThemeProps<Style> {
  label: React.ReactNode;
  children: React.ReactNode;
}

export const PureRideProperty = ({ label, children, styles }: Props) => (
  <View style={styles.propertyContainer}>
    <Text style={styles.label}>{label}</Text>
    {typeof children === "string" ? (
      <Text style={styles.textContainer}>{children}</Text>
    ) : (
      <View style={styles.viewContainer}>{children}</View>
    )}
  </View>
);

const getStyles = ({ colors, fonts }) =>
  StyleSheet.create({
    propertyContainer: {
      flexGrow: 1,
      margin: 8,
      color: colors.defaultText,
    },
    label: {
      ...fonts.SubTitle,
      color: colors.subtitle,
    },
    textContainer: {
      ...fonts.BodyRegular,
      color: colors.defaultText,
      marginTop: 8,
      flexWrap: "wrap",
    },
    viewContainer: { flexDirection: "row", alignItems: "center" },
  });

export default withTheme<Props>(getStyles)(PureRideProperty);
