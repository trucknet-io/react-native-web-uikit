import * as React from "react";
import { Dimensions } from "react-native";
import { initialWindowSize } from "../Themes/Variables";
import { ThemeProvider } from "../Contexts/ThemeContext";

class ThemeProviderWrapper extends React.PureComponent {
  public state = {
    theme: "light" as "light",
    windowSize: initialWindowSize,
  };
  public componentDidMount = () => {
    Dimensions.addEventListener("change", (dim) => {
      this.setState({ windowSize: dim.window });
    });
  };
  render() {
    const value = { ...this.state, switchTheme: this.switchTheme };
    return <ThemeProvider value={value}>{this.props.children}</ThemeProvider>;
  }

  private switchTheme = () => {
    if (this.state.theme === "light") {
      return this.setState({ theme: "dark" });
    }
    return this.setState({ theme: "light" });
  };
}

export default ThemeProviderWrapper;
