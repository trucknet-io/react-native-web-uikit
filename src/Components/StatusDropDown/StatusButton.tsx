import React from "react";
import { StyleSheet } from "react-native";
import { TransparentButton } from "src/Components/Buttons";
import ThemedText from "src/Components/ThemedText";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Style = ReturnType<typeof getStyles>;

export type Status = { key: string; value: React.ReactNode };

interface OwnProps {
  value: Status["value"];
  isCurrentStatus: boolean;
  onStatusPress: () => void;
}

interface Props extends ThemeProps<Style>, OwnProps {}

const StatusButton = ({ value, isCurrentStatus, onStatusPress, styles }: Props) => {
  return (
    <TransparentButton style={styles.container} disabled={isCurrentStatus} onPress={onStatusPress}>
      <ThemedText>{value}</ThemedText>
    </TransparentButton>
  );
};

const getStyles = ({ colors, props }: ThemeParamsType<OwnProps>) =>
  StyleSheet.create({
    container: {
      backgroundColor: props.isCurrentStatus ? colors.shadow : colors.background,
      alignItems: "flex-start",
      justifyContent: "flex-start",
      borderRadius: 0,
      marginHorizontal: 0,
      paddingHorizontal: 16,
    },
  });

export default withTheme<Props>(getStyles)(StatusButton);
