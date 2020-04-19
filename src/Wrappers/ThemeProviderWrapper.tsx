import * as React from "react";
import { ThemeProvider } from "src/Contexts/ThemeContext";
import { ThemeType } from "src/Themes/withTheme";

type Props = { children: React.ReactChild; theme: ThemeType };

const ThemeProviderWrapper = (props: Props) => {
  const [theme, useTheme] = React.useState(props.theme);
  React.useEffect(
    () => {
      useTheme(props.theme);
    },
    [props.theme],
  );
  const toggleTheme = () => {
    useTheme((theme) => {
      if (theme === "dark") {
        return "light";
      }
      return "dark";
    });
  };

  const value = { theme, toggleTheme };
  return <ThemeProvider value={value}>{props.children}</ThemeProvider>;
};

ThemeProviderWrapper.defaultProps = {
  theme: "light",
};

export default ThemeProviderWrapper;
