import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Style = ReturnType<typeof getStyles>;

interface OwnProps {
  originPrimaryText: React.ReactNode;
  originSecondaryText?: React.ReactNode;
  destinationPrimaryText: React.ReactNode;
  destinationSecondaryText?: React.ReactNode;
  extraRideInfo?: React.ReactNode;
  isHorizontal?: boolean;
}

interface Props extends OwnProps, ThemeProps<Style> {}

class RideInfo extends React.PureComponent<Props> {
  render() {
    const {
      originPrimaryText,
      originSecondaryText,
      destinationPrimaryText,
      destinationSecondaryText,
      extraRideInfo,
    } = this.props;
    const rideInfoStyles = this.getRideInfoStyles();
    const { styles } = this.props;
    return (
      <View style={rideInfoStyles.container}>
        <View style={rideInfoStyles.originContainer}>
          <Text style={styles.mainText}>{originPrimaryText}</Text>
          <Text style={styles.secondaryText}>{originSecondaryText}</Text>
        </View>
        {extraRideInfo ? (
          <View style={rideInfoStyles.extraRideInfoContainer}>
            <Text style={styles.secondaryText}>{extraRideInfo}</Text>
          </View>
        ) : null}
        <View style={rideInfoStyles.destinationContainer}>
          <Text style={styles.mainText}>{destinationPrimaryText}</Text>
          <Text style={styles.secondaryText}>{destinationSecondaryText}</Text>
        </View>
      </View>
    );
  }

  private getRideInfoStyles = () => {
    const { styles } = this.props;
    if (this.props.isHorizontal) {
      return {
        container: styles.horizontalContainer,
        extraRideInfoContainer: styles.extraRideInfoHorizontalContainer,
        originContainer: styles.originContainer,
        destinationContainer: styles.destinationHorizontalContainer,
      };
    }
    return {
      container: styles.verticalContainer,
      extraRideInfoContainer: styles.extraRideInfoVerticalContainer,
      originContainer: styles.originContainer,
      destinationContainer: styles.destinationVerticalContainer,
    };
  };
}

const getStyles = ({ fonts }: ThemeParamsType) => {
  return StyleSheet.create({
    horizontalContainer: {
      justifyContent: "space-between",
      flexDirection: "row",
    },
    verticalContainer: { justifyContent: "space-between" },
    originContainer: {
      flex: 1,
    },
    extraRideInfoHorizontalContainer: { flexShrink: 1, alignItems: "center" },
    extraRideInfoVerticalContainer: { flexShrink: 1, justifyContent: "center" },
    destinationHorizontalContainer: { flex: 1, alignItems: "flex-end" },
    destinationVerticalContainer: { flex: 1, justifyContent: "flex-end" },
    mainText: fonts.BodyRegular,
    secondaryText: fonts.BodySmall,
  });
};
export default withTheme<Props>(getStyles)(RideInfo);