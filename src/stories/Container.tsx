import * as React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { isWeb } from "src/Helpers/platform";

const Container = ({ children }: { children: React.ReactChild | React.ReactChild[] }) => (
  <View style={styles.container}>{children}</View>
);

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const styles = isWeb
  ? StyleSheet.create({
      container: {
        flex: 1,
        height,
        width,
        alignItems: "center",
        justifyContent: "center",
      },
    })
  : StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
    });

export default Container;
