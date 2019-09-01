import { colorTheme, ColorThemeNameType, ColorThemeType } from "./Colors";
import * as React from "react";
import { StyleProp, Dimensions } from "react-native";
import getVariables, { GetVariablesType } from "./Variables";
import { getThemeFont } from "./Fonts";

export type ThemeProviderType = { colorThemeName: ColorThemeNameType; dimensions: Dimensions };
export type SetStyleParamsType = {
  color: ColorThemeType;
  getFont: ReturnType<typeof getThemeFont>;
  variables: GetVariablesType;
};

const { Provider, Consumer } = React.createContext({
  colorThemeName: "light",
  dimensions: Dimensions,
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
  return class WithContextHOC extends React.Component<P, Exclude<keyof P, keyof WithStyle<S>>> {
    public render() {
      return <ThemeConsumer>{this.renderComponent}</ThemeConsumer>;
    }

    public renderComponent = (ctx: ThemeProviderType) => {
      const { colorThemeName, dimensions } = ctx;
      const color = colorTheme[colorThemeName];
      const getFont = getThemeFont(colorThemeName);
      const variables = getVariables(dimensions);
      const componentStyle = getComponentStyle({ color, getFont, variables });
      const style: StyleProp<typeof componentStyle> = componentStyle;
      return <Component {...this.props} style={style} colorThemeName={colorThemeName} variables={variables} />;
    };
  };
};
