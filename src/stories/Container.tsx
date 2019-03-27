import * as React from "react";
import { StyleSheet, View, Dimensions } from "react-native";

const Container = ({ children }: { children: React.ReactChild }) => <View style={styles.container}>{children}</View>;

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Container;
