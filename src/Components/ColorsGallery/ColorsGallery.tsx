import * as React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Colors from "src/Themes/Colors";
import { isWeb } from "src/Helpers/platform";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Styles = ReturnType<typeof getStyles>;
interface Props extends ThemeProps<Styles> {}

export class PureColorsGallery extends React.PureComponent<Props> {
  public render() {
    return (
      <ScrollView style={this.props.styles.container}>
        <View style={this.props.styles.colorViewContainer}>
          {this.renderColors()}
          <Text style={this.props.styles.text}>Palette Colors</Text>
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
          <Text style={this.props.styles.text}>{colorName}</Text>
          <View style={[this.props.styles.colorView, { backgroundColor: theme[colorName] }]} />
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
          <Text style={this.props.styles.text}>{color}</Text>
          <View style={[this.props.styles.colorView, { backgroundColor: this.props.colors[color] }]} />
        </View>
      );
    });
  };
}

const getStyles = ({ colors }: ThemeParamsType) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.containerBackground,
      padding: 50,
      width: "100%",
    },
    text: {
      margin: 2,
      marginTop: 10,
      color: colors.defaultText,
      fontSize: 18,
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
      borderColor: colors.borderColor,
      borderWidth: 1,
    },
  });

export default withTheme<Props>(getStyles)(PureColorsGallery);
