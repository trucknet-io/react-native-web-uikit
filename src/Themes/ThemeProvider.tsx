import Colors, { colorTheme, ColorThemeNameType, ColorThemeType } from "./Colors";
import * as React from "react";
import { StyleProp } from "react-native";
import { getThemeFont } from "./Fonts";

export type ThemeProviderType = { colorThemeName: ColorThemeNameType };
export type SetStyleParamsType = { color: ColorThemeType; getFont: ReturnType<typeof getThemeFont> };

const { Provider, Consumer } = React.createContext({
  colorThemeName: "light",
});

const ThemeProvider = Provider as React.Provider<ThemeProviderType>;
const ThemeConsumer = Consumer as React.Consumer<ThemeProviderType>;

export { ThemeProvider };

type GetComponentStyle<S> = (theme: SetStyleParamsType) => S;

export interface WithStyle<S> {
  style: S;
  colors: typeof Colors;
  colorThemeName: ColorThemeNameType;
}

export const withTheme = <P, S>(getComponentStyle: GetComponentStyle<S>) => (Component: React.ComponentType<P>) => {
  return class WithContextHOC extends React.Component<P, Exclude<keyof P, keyof WithStyle<S>>> {
    public render() {
      return <ThemeConsumer>{this.renderComponent}</ThemeConsumer>;
    }

    public renderComponent = (ctx: ThemeProviderType) => {
      const { colorThemeName } = ctx;
      const color = colorTheme[colorThemeName];
      const getFont = getThemeFont(colorThemeName);
      const componentStyle = getComponentStyle({ color, getFont });
      const style: StyleProp<typeof componentStyle> = componentStyle;
      return <Component {...this.props} style={style} colorThemeName={colorThemeName} />;
    };
  };
};
