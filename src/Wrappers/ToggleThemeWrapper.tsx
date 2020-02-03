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
          borderWidth={1}
          onPress={this.props.toggleTheme}
          style={this.props.styles.buttonStyle}
        />
        {this.props.children}
      </View>
    );
  }
}

const getStyles = ({ colors, variables }: ThemeParamsType) =>
  StyleSheet.create({
    container: { backgroundColor: colors.containerBackground, height: "100%", padding: variables.size.m },
    buttonStyle: {
      width: undefined,
      padding: variables.size.m,
      marginBottom: variables.size.m,
    },
  });

export default withTheme<Props>(getStyles)(ToggleThemeWrapper);
