import * as React from "react";
import { ThemeProvider } from "src/Contexts/ThemeContext";
import { ThemeType } from "src/Themes/withTheme";

type Props = { children: React.ReactChild };
type State = {
  theme: ThemeType;
};

class ThemeProviderWrapper extends React.PureComponent<Props, State> {
  public state: State = {
    theme: "dark",
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
