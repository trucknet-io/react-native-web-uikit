import { ColorThemeNames } from "../Themes/Colors";
import * as React from "react";
import { WindowSizeType, initialWindowSize } from "../Themes/Variables";

export type ThemeProviderType = {
  theme: ColorThemeNames;
  windowSize: WindowSizeType;
  switchTheme?: () => void;
};
const { Provider, Consumer } = React.createContext({
  theme: "light",
  windowSize: initialWindowSize,
  switchTheme: undefined,
});

export const ThemeProvider = Provider as React.Provider<ThemeProviderType>;
export const ThemeConsumer = Consumer as React.Consumer<ThemeProviderType>;
