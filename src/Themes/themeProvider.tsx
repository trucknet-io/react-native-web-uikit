import Colors, { colorTheme, ColorThemeName } from "./Colors";
import * as React from "react";
import { StyleProp } from "react-native";
import { getThemeFont } from "./Fonts";

export type ProviderThemeType = { colorThemeName: ColorThemeName };
export type ComponentThemeType = { color: ColorThemeType; getFont: ReturnType<typeof getThemeFont> };

const { Provider, Consumer } = React.createContext({
  colorThemeName: "light",
});

const ThemeProvider = Provider as React.Provider<ProviderThemeType>;
const ThemeConsumer = Consumer as React.Consumer<ProviderThemeType>;

export { ThemeProvider };

type ColorThemeType = typeof Colors;

export type GetComponentStyle<S> = (theme: ComponentThemeType) => S;

export interface WithStyle<S> {
  style: S;
  colors: typeof Colors;
  colorThemeName: ColorThemeName;
}

export const withTheme = <P, S>(getComponentStyle: GetComponentStyle<S>) => (Component: React.ComponentType<P>) => {
  return class WithContextHOC extends React.Component<P, Exclude<keyof P, keyof WithStyle<S>>> {
    public render() {
      return <ThemeConsumer>{this.renderComponent}</ThemeConsumer>;
    }

    public renderComponent = (ctx: ProviderThemeType) => {
      const { colorThemeName } = ctx;
      const color = colorTheme[colorThemeName];
      const getFont = getThemeFont(colorThemeName);
      const componentStyle = getComponentStyle({ color, getFont });
      const style: StyleProp<typeof componentStyle> = componentStyle;
      return <Component {...this.props} style={style} color={color} colorThemeName={colorThemeName} />;
    };
  };
};
