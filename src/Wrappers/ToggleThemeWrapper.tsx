import * as React from "react";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";
import { TransparentButton } from "src/Components/Buttons";
import { StyleSheet, View } from "react-native";

type Styles = ReturnType<typeof getStyles>;
interface Props extends ThemeProps<Styles> {}

class ToggleThemeWrapper extends React.PureComponent<Props> {
  render() {
    return (
      <View style={this.props.styles.container}>
        <TransparentButton
          label="Toggle Theme"
          onPress={this.props.toggleTheme}
          style={this.props.styles.buttonStyle}
        />
        <View style={this.props.styles.childrenContainer}>{this.props.children}</View>
      </View>
    );
  }
}

const getStyles = ({ colors, variables }: ThemeParamsType) =>
  StyleSheet.create({
    container: { backgroundColor: colors.containerBackground, height: "100%" },
    childrenContainer: { padding: variables.size.s, flex: 1 },
    buttonStyle: {
      padding: variables.size.m,
      marginBottom: variables.size.m,
      borderWidth: 1,
      borderRadius: 0,
    },
  });

export default withTheme<Props>(getStyles)(ToggleThemeWrapper);
