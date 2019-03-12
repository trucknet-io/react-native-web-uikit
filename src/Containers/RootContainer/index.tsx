import * as React from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import ButtonsContainer from "../ButtonsContainer";
import Colors from "../../Themes/Colors";

class Root extends React.PureComponent<{}> {
  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftPanel}>
          <Text style={styles.label}>Buttons</Text>
        </View>
        <ButtonsContainer />
      </View>
    );
  }
}

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
    alignItems: "center",
  },
  label: {
    color: Colors.buttonText,
    marginTop: 20,
    fontSize: 18,
  },
});

export default Root;
