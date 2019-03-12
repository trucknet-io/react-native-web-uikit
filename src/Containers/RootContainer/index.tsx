import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import ButtonsContainer from "../ButtonsContainer";

class Root extends React.PureComponent<{}> {
  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftPanel} />
        <ButtonsContainer />
      </View>
    );
  }
}

// tslint:disable-next-line
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  leftPanel: {
    minHeight: windowHeight,
    width: "15%",
    elevation: 4,
    backgroundColor: "#2979FF",
  },
});

export default Root;
