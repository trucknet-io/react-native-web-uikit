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
          <Text style={rideInfoStyles.destinationMainText}>{destinationPrimaryText}</Text>
          <Text style={rideInfoStyles.destinationSecondaryText}>{destinationSecondaryText}</Text>
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
        destinationMainText: styles.mainTextDestination,
        destinationSecondaryText: styles.secondaryTextDestination,
      };
    }
    return {
      container: styles.verticalContainer,
      extraRideInfoContainer: styles.extraRideInfoVerticalContainer,
      originContainer: styles.originContainer,
      destinationContainer: styles.destinationVerticalContainer,
      destinationMainText: styles.mainText,
      destinationSecondaryText: styles.secondaryText,
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
      flexGrow: 1,
      flexBasis: 0,
      textAlign: "left",
    },
    extraRideInfoHorizontalContainer: { alignItems: "center" },
    extraRideInfoVerticalContainer: { justifyContent: "center" },
    destinationHorizontalContainer: {
      flexGrow: 1,
      flexBasis: 0,
      alignItems: "flex-end",
    },
    destinationVerticalContainer: { flex: 1, justifyContent: "flex-end" },
    mainText: { ...fonts.BodyRegular, textAlign: "left" },
    secondaryText: { ...fonts.BodySmall, textAlign: "left" },
    mainTextDestination: { ...fonts.BodyRegular, textAlign: "right" },
    secondaryTextDestination: { ...fonts.BodySmall, textAlign: "right" },
  });
};
export default withTheme<Props>(getStyles)(RideInfo);
