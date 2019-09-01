import { colorTheme, ColorThemeNameType, ColorThemeType } from "./Colors";
import * as React from "react";
import getVariables, { GetVariablesType, WindowSizeType, initialWindowSize } from "./Variables";
import { getThemeFont } from "./Fonts";

export type ThemeProviderType = {
  colorThemeName: ColorThemeNameType;
  windowSize: WindowSizeType;
};
export type SetStyleParamsType = {
  color: ColorThemeType;
  getFont: ReturnType<typeof getThemeFont>;
  variables: GetVariablesType;
};

const { Provider, Consumer } = React.createContext({
  colorThemeName: "light",
  windowSize: initialWindowSize,
});

const ThemeProvider = Provider as React.Provider<ThemeProviderType>;
const ThemeConsumer = Consumer as React.Consumer<ThemeProviderType>;

export { ThemeProvider };

type GetComponentStyle<S> = (theme: SetStyleParamsType) => S;

export interface WithStyle<S> {
  style: S;
  colorThemeName: ColorThemeNameType;
  variables: GetVariablesType;
}

export const withTheme = <P, S>(getComponentStyle: GetComponentStyle<S>) => (Component: React.ComponentType<P>) => {
  return class WithContextHOC extends React.PureComponent<P, Exclude<keyof P, keyof WithStyle<S>>> {
    public render() {
      return <ThemeConsumer>{this.renderComponent}</ThemeConsumer>;
    }

    public renderComponent = (ctx: ThemeProviderType) => {
      const { colorThemeName, windowSize } = ctx;
      const color = colorTheme[colorThemeName];
      const getFont = getThemeFont(colorThemeName);
      const variables = getVariables(windowSize);
      const style = getComponentStyle({ color, getFont, variables });
      return <Component {...this.props} style={style} colorThemeName={colorThemeName} variables={variables} />;
    };
  };
};
