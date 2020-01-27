import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "src/Themes/Colors";
import fonts from "src/Themes/Fonts";

interface IProps {
  label: React.ReactNode;
  children: React.ReactNode;
}

const RideProperty = ({ label, children }: IProps) => (
  <View style={styles.propertyContainer}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  propertyContainer: {
    flexShrink: 1,
    margin: 8,
  },
  label: {
    ...fonts.style.Subheading,
    color: colors.subtitle,
  },
});

export default RideProperty;
