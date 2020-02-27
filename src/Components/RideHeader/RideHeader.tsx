import * as React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import Point from "src/Components/Point";
import { getTransparentColor } from "src/Themes/Colors";
import fonts from "src/Themes/Fonts";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Style = ReturnType<typeof getStyle>;

interface OwnProps {
  color: string;
  primaryText: React.ReactNode;
  secondaryText?: React.ReactNode;
  style?: ViewStyle;
}

interface Props extends ThemeProps<Style>, OwnProps {}

export class PureRideHeader extends React.PureComponent<Props> {
  public render() {
    const { color, primaryText, secondaryText, styles } = this.props;
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.textContainer}>
          <Point color={color} />
          <View style={styles.primaryTextContainer}>
            <Text numberOfLines={1} style={styles.headerText}>
              {primaryText}
            </Text>
          </View>
          {secondaryText ? (
            <View style={styles.secondaryTextContainer}>
              <Text numberOfLines={1} style={styles.headerText}>
                {secondaryText}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const getStyle = ({ props: { color } }: ThemeParamsType<OwnProps>) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "row",
      padding: 16,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      width: "100%",
      backgroundColor: getTransparentColor(color),
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
      ...fonts.SubTitle,
      lineHeight: 16,
      marginHorizontal: 8,
      color,
    },
  });

export default withTheme<Props>(getStyle)(PureRideHeader);
