import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Style = ReturnType<typeof getStyles>;

interface OwnProps {
  originPrimaryText: React.ReactNode;
  originSecondaryText?: React.ReactNode;
  destinationPrimaryText: React.ReactNode;
  destinationSecondaryText?: React.ReactNode;
}

interface Props extends OwnProps, ThemeProps<Style> {}

class RideInfo extends React.PureComponent<Props> {
  render() {
    const { originPrimaryText, originSecondaryText, destinationPrimaryText, destinationSecondaryText } = this.props;
    const { styles } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.originContainer}>
          <Text style={styles.mainText} numberOfLines={2}>
            {originPrimaryText}
          </Text>
          <Text style={styles.secondaryText} numberOfLines={2}>
            {originSecondaryText}
          </Text>
        </View>
        <View />
        <View style={styles.destinationContainer}>
          <Text style={styles.mainText} numberOfLines={2}>
            {destinationPrimaryText}
          </Text>
          <Text style={styles.secondaryText} numberOfLines={2}>
            {destinationSecondaryText}
          </Text>
        </View>
      </View>
    );
  }
}

const getStyles = ({ fonts }: ThemeParamsType) => {
  return StyleSheet.create({
    container: { justifyContent: "space-between", marginVertical: -4 },
    originContainer: {
      flexGrow: 1,
      flexBasis: 0,
    },
    extraRideInfoContainer: { justifyContent: "center" },
    destinationContainer: { flex: 1, justifyContent: "flex-end" },
    mainText: { ...fonts.BodyRegular, textAlign: "left" },
    secondaryText: { ...fonts.BodySmall, textAlign: "left" },
    mainTextDestination: { ...fonts.BodyRegular, textAlign: "right" },
    secondaryTextDestination: { ...fonts.BodySmall, textAlign: "right" },
  });
};
export default withTheme<Props>(getStyles)(RideInfo);
