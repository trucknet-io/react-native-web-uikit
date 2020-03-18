import { getColors, ColorType, ColorThemeNames } from "./Colors";
import * as React from "react";
import variables, { VariablesType } from "./variables";
import { getFonts, FontType } from "./Fonts";
import { ThemeConsumer, ThemeProviderType } from "src/Contexts/ThemeContext";
import { StyleProp } from "react-native";

export type ThemeType = ColorThemeNames;

export interface ThemeParamsType<P = unknown> {
  colors: ColorType;
  fonts: FontType;
  variables: VariablesType;
  props: P;
}

export interface ThemeProps<S = unknown> {
  styles: S;
  theme: ThemeType;
  variables: VariablesType;
  colors: ColorType;
  fonts: FontType;
  toggleTheme: () => void;
}

type WithOutProps<P, D> = Pick<P, Exclude<keyof P, keyof D>>;

const withTheme = <P, D = {}>(getComponentStyle?: (p: ThemeParamsType<P>) => { [key: string]: StyleProp<unknown> }) => (
  Component: React.ComponentClass<P> | React.FunctionComponent<P>,
) => {
  type ComponentProps = WithOutProps<WithOutProps<P, D> & Partial<D>, ThemeProps>;
  return React.forwardRef((componentProps: ComponentProps, ref) => {
    console.log("rerender");
    const renderComponent = (ctx: ThemeProviderType) => {
      const { theme, toggleTheme } = ctx;
      const colors = getColors(theme);
      const fonts = getFonts(theme);
      const props = { ...Component.defaultProps, ...componentProps } as P;
      const styles = getComponentStyle ? getComponentStyle({ colors, fonts, variables, props }) : undefined;
      return (
        <Component
          {...props}
          ref={ref}
          styles={styles}
          theme={theme}
          variables={variables}
          colors={colors}
          fonts={fonts}
          toggleTheme={toggleTheme}
        />
      );
    };

    return <ThemeConsumer>{renderComponent}</ThemeConsumer>;
  });
};

export default withTheme;
