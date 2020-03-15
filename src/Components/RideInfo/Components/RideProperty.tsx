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
    <View style={styles.viewContainer}>{children}</View>
  </View>
);

const getStyles = ({ colors, fonts }) =>
  StyleSheet.create({
    propertyContainer: {
      flexGrow: 1,
      margin: 8,
    },
    label: {
      ...fonts.SubTitle,
      color: colors.subtitle,
    },
    viewContainer: {
      flexDirection: "row",
      alignItems: "center",
      color: colors.defaultText,
      flexWrap: "wrap",
    },
  });

export default withTheme<Props>(getStyles)(PureRideProperty);
