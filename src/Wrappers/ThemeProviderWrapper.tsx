import * as React from "react";
import { ThemeProvider } from "src/Contexts/ThemeContext";

class ThemeProviderWrapper extends React.PureComponent {
  public state = {
    theme: "light" as "light",
  };

  render() {
    const value = { theme: this.state.theme, toggleTheme: this.toggleTheme };
    return <ThemeProvider value={value}>{this.props.children}</ThemeProvider>;
  }

  private toggleTheme = () => {
    if (this.state.theme === "light") {
      return this.setState({ theme: "dark" });
    }
    return this.setState({ theme: "light" });
  };
}

export default ThemeProviderWrapper;
