import * as React from "react";
import { View, StyleSheet } from "react-native";

export default class StoryWrapper extends React.PureComponent {
  render() {
    return <View style={styles.container}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, marginVertical: 16, marginHorizontal: 16 },
});
