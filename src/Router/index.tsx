import * as React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Icons from "../Containers/IconsContainer";
import Buttons from "../Containers/ButtonsContainer";
import Modals from "../Containers/ModalsContainer";
import Gradient from "../Containers/GradientContainer";
import createShadow from "../Themes/Shadow";
import Colors from "../Themes/Colors";
import LinearGradient from "../Components/LinearGradient";
import { Route, Link } from "react-router-native";
import { isWeb } from "../Helpers/platform";
import RootWrapper from "../Wrappers/RootWrapper";

const Router = isWeb ? require("react-router-native").BrowserRouter : require("react-router-native").NativeRouter;

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <RootWrapper styles={styles.container}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            gradientStartColor={Colors.themeGradient.gradientColor1}
            gradientEndColor={Colors.themeGradient.gradientColor2}
            style={styles.gradient}>
            <View style={styles.leftPanel}>
              <Link to="/icons" underlayColor={null}>
                <Text style={styles.label}>Icons</Text>
              </Link>
              <Link to="/gradient" underlayColor={null}>
                <Text style={styles.label}>Gradient</Text>
              </Link>
              <Link to="/buttons" underlayColor={null}>
                <Text style={styles.label}>Buttons</Text>
              </Link>
              <Link to="/modals" underlayColor={null}>
                <Text style={styles.label}>Modals</Text>
              </Link>
            </View>
          </LinearGradient>
          <Route path="/icons" component={Icons} />
          <Route path="/gradient" component={Gradient} />
          <Route path="/buttons" component={Buttons} />
          <Route path="/modals" component={Modals} />
        </RootWrapper>
      </Router>
    );
  }
}

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
    // @ts-ignore: fixed position incompatible with react-native styles
    position: isWeb ? "fixed" : undefined,
    alignItems: "center",
    justifyContent: "space-around",
    height: windowHeight,
  },
  label: {
    color: Colors.buttonText,
    marginTop: 10,
    fontSize: 18,
  },
});

export default App;
