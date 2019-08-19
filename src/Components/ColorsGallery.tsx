import * as React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Colors, { colorTheme } from "../Themes/Colors";
import LinearGradient from "./LinearGradient";

type Props = {
  theme: "light" | "dark";
};

class ColorsGallery extends React.PureComponent<Props> {
  static defaultProps = {
    theme: "light",
  };
  public render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderColors()}
        <Text>Palette Colors</Text>
        {this.renderPaletteColors()}
      </ScrollView>
    );
  }

  renderPaletteColors = () => {
    const theme = colorTheme[this.props.theme].palette;
    const colorNames = Object.keys(Colors.palette);
    return colorNames.map((colorName) => {
      return (
        <View style={styles.colorViewContainer}>
          <Text>{colorName}</Text>
          <View style={[styles.colorView, { backgroundColor: theme[colorName] }]} />
        </View>
      );
    });
  };

  renderColors = () => {
    const theme = colorTheme[this.props.theme];
    const colorNames = Object.keys(Colors);
    return colorNames.map((colorName) => {
      if (colorName !== "palette") {
        if (typeof theme[colorName] === "string") {
          return (
            <View style={styles.colorViewContainer}>
              <Text>{colorName}</Text>
              <View style={[styles.colorView, { backgroundColor: theme[colorName] }]} />
            </View>
          );
        }
        return (
          <View style={styles.colorViewContainer}>
            <Text>{colorName}</Text>
            <LinearGradient
              style={styles.colorView}
              gradientStartColor={theme[colorName].gradientColor1}
              gradientEndColor={theme[colorName].gradientColor2}
            />
          </View>
        );
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.palette.veryVeryLightGray,
    padding: 50,
    width: "100%",
  },
  colorViewContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  colorView: {
    width: 450,
    height: 65,
    borderRadius: 4,
    borderColor: Colors.borderColor,
    borderWidth: 1,
  },
});

export default ColorsGallery;
