import * as React from "react";
import { View, StyleSheet } from "react-native";
import ThemeProviderWrapper from "./ThemeProviderWrapper";
import ToggleThemeWrapper from "./ToggleThemeWrapper";

export default class StoryWrapper extends React.PureComponent {
  render() {
    return (
      <ThemeProviderWrapper>
        <ToggleThemeWrapper>
          <View style={styles.container}>{this.props.children}</View>
        </ToggleThemeWrapper>
      </ThemeProviderWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: { flexGrow: 1 },
});
