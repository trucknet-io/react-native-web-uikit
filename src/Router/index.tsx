import React from "react";
import { Platform, StyleSheet, View, Text, Dimensions } from "react-native";
import Buttons from "../Containers/ButtonsContainer";
import Dialogs from "../Containers/DialogsContainer";
import Gradient from "../Containers/GradientContainer";
import createShadow from "../Themes/Shadow";
import Colors from "../Themes/Colors";
import LinearGradient from "../Components/LinearGradient";
// @ts-ignore
import { Route, Link } from "react-router-native";

const App = () => {
  const Router =
    Platform.OS === "web" ? require("react-router-native").BrowserRouter : require("react-router-native").NativeRouter;
  return (
    <Router>
      <View style={styles.container}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          gradientStartColor={Colors.themeGradient.gradientColor1}
          gradientEndColor={Colors.themeGradient.gradientColor2}
          style={styles.gradient}>
          <View style={styles.leftPanel}>
            <Link to="/gradient" underlayColor={null}>
              <Text style={styles.label}>Gradient</Text>
            </Link>
            <Link to="/buttons" underlayColor={null}>
              <Text style={styles.label}>Buttons</Text>
            </Link>
            <Link to="/dialogs" underlayColor={null}>
              <Text style={styles.label}>Dialogs</Text>
            </Link>
          </View>
        </LinearGradient>
        <Route path="/gradient" component={Gradient} />
        <Route path="/buttons" component={Buttons} />
        <Route path="/dialogs" component={Dialogs} />
      </View>
    </Router>
  );
};

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  gradient: {
    minHeight: windowHeight,
    width: "15%",
    alignItems: "center",
    ...createShadow(4),
  },
  leftPanel: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  label: {
    color: Colors.buttonText,
    marginTop: 20,
    fontSize: 18,
  },
});

export default App;
