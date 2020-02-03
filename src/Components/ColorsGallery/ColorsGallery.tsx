import * as React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Colors from "src/Themes/Colors";
import { isWeb } from "src/Helpers/platform";
import withTheme, { ThemeProps } from "src/Themes/withTheme";

interface Props extends ThemeProps<typeof styles> {}

class ColorsGallery extends React.PureComponent<Props> {
  public render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.colorViewContainer}>
          {this.renderColors()}
          <Text style={[styles.text, { fontSize: 18 }]}>Palette Colors</Text>
          {this.renderPaletteColors()}
        </View>
      </ScrollView>
    );
  }

  renderPaletteColors = () => {
    const theme = this.props.colors.palette;
    const colorNames = Object.keys(Colors.palette);
    return colorNames.map((colorName) => {
      return (
        <View>
          <Text style={styles.text}>{colorName}</Text>
          <View style={[styles.colorView, { backgroundColor: theme[colorName] }]} />
        </View>
      );
    });
  };

  renderColors = () => {
    const colorNames = Object.keys(this.props.colors);
    return colorNames.map((color) => {
      if (color === "palette" || typeof this.props.colors[color] !== "string") return <View />;
      return (
        <View>
          <Text style={styles.text}>{color}</Text>
          <View style={[styles.colorView, { backgroundColor: this.props.colors[color] }]} />
        </View>
      );
    });
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.palette.veryVeryLightGray,
    padding: 50,
    width: "100%",
  },
  text: {
    margin: 2,
    marginTop: 10,
  },
  colorViewContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  colorView: {
    width: isWeb ? 450 : 200,
    height: 65,
    borderRadius: 4,
    borderColor: Colors.borderColor,
    borderWidth: 1,
  },
});

export default withTheme<Props>()(ColorsGallery);
