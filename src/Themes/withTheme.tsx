import { getColors, ColorType, ColorThemeNames } from "./Colors";
import * as React from "react";
import variables, { VariablesType } from "./variables";
import { getFonts, FontType } from "./Fonts";
import { ThemeConsumer, ThemeProviderType } from "src/Contexts/ThemeContext";
import { StyleProp } from "react-native";

export type ThemeType = ColorThemeNames;

export type ThemeParamsType = {
  colors: ColorType;
  fonts: FontType;
  variables: VariablesType;
};

export interface ThemeProps<S = {}> {
  styles: S;
  theme: ThemeType;
  variables: VariablesType;
  colors: ColorType;
  fonts: FontType;
  toggleTheme: () => void;
}

type WithOutProps<P, D> = Pick<P, Exclude<keyof P, keyof D>>;

const withTheme = <P, D = {}>(getComponentStyle?: (p: ThemeParamsType) => { [key: string]: StyleProp<unknown> }) => (
  Component: React.ComponentClass<P>,
) => {
  type ComponentProps = WithOutProps<WithOutProps<P, D> & Partial<D>, ThemeProps>;
  return class WithContextHOC extends React.PureComponent<ComponentProps> {
    public render() {
      return <ThemeConsumer>{this.renderComponent}</ThemeConsumer>;
    }

    public renderComponent = (ctx: ThemeProviderType) => {
      const { theme, toggleTheme } = ctx;
      const colors = getColors(theme);
      const fonts = getFonts(theme);
      const styles = getComponentStyle ? getComponentStyle({ colors, fonts, variables }) : undefined;
      const componentOwnProps = this.props as P;
      return (
        <Component
          {...componentOwnProps}
          styles={styles}
          theme={theme}
          variables={variables}
          colors={colors}
          fonts={fonts}
          toggleTheme={toggleTheme}
        />
      );
    };
  };
};

export default withTheme;
