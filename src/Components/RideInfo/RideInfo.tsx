import * as React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import RideProperty from "./Components";
import colors from "src/Themes/Colors";
import fonts from "src/Themes/Fonts";

interface IProps {
  properties: { label: React.ReactNode; content: React.ReactNode }[];
  style?: ViewStyle;
}

class RideInfo extends React.Component<IProps> {
  public render() {
    const { properties } = this.props;
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

const styles = StyleSheet.create({
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
    ...fonts.style.BodyRegular,
    color: colors.defaultText,
    marginTop: 8,
    flexWrap: "wrap",
  },
  viewProperty: {
    marginTop: 8,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default RideInfo;
