import * as React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import RideProperty from "./Components";
import fonts from "src/Themes/Fonts";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Style = ReturnType<typeof getStyles>;

interface Props extends ThemeProps<Style> {
  properties: { label: React.ReactNode; content: React.ReactNode }[];
  style?: ViewStyle;
}

export class PureRideInfo extends React.Component<Props> {
  public render() {
    const { properties, styles } = this.props;
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.propertiesRawContainer}>
          {properties.map((property, index) => (
            <RideProperty
              key={typeof property.label === "string" ? property.label : index.toString()}
              label={property.label}>
              {typeof property.content === "string" ? (
                <Text numberOfLines={1} style={styles.textProperty}>
                  {property.content}
                </Text>
              ) : (
                <View style={styles.viewProperty}>{property.content}</View>
              )}
            </RideProperty>
          ))}
        </View>
      </View>
    );
  }
}

const getStyles = ({ colors }: ThemeParamsType) =>
  StyleSheet.create({
    container: {
      justifyContent: "space-around",
      flexGrow: 1,
    },

    propertiesRawContainer: {
      flexGrow: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    textProperty: {
      ...fonts.BodyRegular,
      color: colors.defaultText,
      marginTop: 8,
      flexWrap: "wrap",
    },
    viewProperty: {
      marginTop: 8,
      flexWrap: "wrap",
      flexDirection: "row",
      alignItems: "center",
      color: colors.defaultText,
    },
  });

export default withTheme<Props>(getStyles)(PureRideInfo);
