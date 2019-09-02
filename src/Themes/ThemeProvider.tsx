import { getColor, ColorThemeNames, ColorType } from "./Colors";
import * as React from "react";
import getVariables, { GetVariablesType, WindowSizeType, initialWindowSize } from "./Variables";
import { getFont } from "./Fonts";

export type ThemeType = ColorThemeNames;

export type ThemeProviderType = {
  theme: ThemeType;
  windowSize: WindowSizeType;
};
export type SetStyleParamsType = {
  color: ColorType;
  font: ReturnType<typeof getFont>;
  variables: GetVariablesType;
};

const { Provider, Consumer } = React.createContext({
  theme: "light",
  windowSize: initialWindowSize,
});

const ThemeProvider = Provider as React.Provider<ThemeProviderType>;
const ThemeConsumer = Consumer as React.Consumer<ThemeProviderType>;

export { ThemeProvider };

type GetComponentStyle<S> = (theme: SetStyleParamsType) => S;

export interface WithStyle<S> {
  style: S;
  theme: ThemeType;
  variables: GetVariablesType;
}

export const withTheme = <P, S>(getComponentStyle: GetComponentStyle<S>) => (Component: React.ComponentType<P>) => {
  return class WithContextHOC extends React.PureComponent<P, Exclude<keyof P, keyof WithStyle<S>>> {
    public render() {
      return <ThemeConsumer>{this.renderComponent}</ThemeConsumer>;
    }

    public renderComponent = (ctx: ThemeProviderType) => {
      const { theme, windowSize } = ctx;
      const color = getColor(theme);
      const font = getFont(theme);
      const variables = getVariables(windowSize);
      const style = getComponentStyle({ color, font, variables });
      return <Component {...this.props} style={style} theme={theme} variables={variables} />;
    };
  };
};
