import { ColorThemeNames } from "src/Themes/Colors";
import * as React from "react";

export type ThemeProviderType = {
  theme: ColorThemeNames;
  toggleTheme?: () => void;
};
const { Provider, Consumer } = React.createContext({
  theme: "light",
  toggleTheme: undefined,
});

export const ThemeProvider = Provider as React.Provider<ThemeProviderType>;
export const ThemeConsumer = Consumer as React.Consumer<ThemeProviderType>;
