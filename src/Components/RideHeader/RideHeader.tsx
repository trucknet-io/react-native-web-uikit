import * as React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import Point from "src/Components/Point";
import colors, { getTransparentColor } from "src/Themes/Colors";
import fonts from "src/Themes/Fonts";

interface IProps {
  color: string;
  primaryText: React.ReactNode;
  secondaryText?: React.ReactNode;
  style?: ViewStyle;
}

class RideHeader extends React.PureComponent<IProps> {
  public render() {
    const { color, primaryText, secondaryText } = this.props;
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: getTransparentColor(color),
          },
          this.props.style,
        ]}>
        <View style={styles.textContainer}>
          <Point color={color} />
          <View style={styles.primaryTextContainer}>
            <Text numberOfLines={1} style={[styles.headerText, { color }]}>
              {primaryText}
            </Text>
          </View>
          {secondaryText ? (
            <View style={styles.secondaryTextContainer}>
              <Text numberOfLines={1} style={[styles.headerText, { color }]}>
                {secondaryText}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    width: "100%",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    textTransform: "uppercase",
  },
  primaryTextContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  secondaryTextContainer: {
    flexShrink: 1,
    alignItems: "center",
  },
  headerText: {
    color: colors.themeColor,
    ...fonts.style.Subheading,
    lineHeight: 16,
    marginHorizontal: 8,
  },
});

export default RideHeader;
