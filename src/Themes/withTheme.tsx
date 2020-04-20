import { getThemeColors, ColorType, ColorThemeNames } from "./Colors";
import * as React from "react";
import variables, { VariablesType } from "./variables";
import { getThemeFonts, FontType } from "./Fonts";
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

const withTheme = <P, D = {}>(
  getComponentStyles?: (p: ThemeParamsType<P>) => { [key: string]: StyleProp<unknown> },
) => (Component: React.ComponentClass<P> | React.FunctionComponent<P>) => {
  type ComponentProps = WithOutProps<WithOutProps<P, D> & Partial<D>, ThemeProps>;
  const initialCache = {
    theme: undefined,
    ThemedComponent: undefined,
    props: {},
  };
  let componentThemeCache: {
    theme?: ColorThemeNames;
    props: P | { [key: string]: unknown };
    ThemedComponent: React.ReactNode;
  } = initialCache;
  return React.forwardRef((props: ComponentProps, ref) => {
    const componentProps = { ...Component.defaultProps, ...props } as P;
    React.useEffect(() => {
      return () => {
        componentThemeCache = initialCache;
      };
    }, []);
    const isPropsSame = (theme: ColorThemeNames) => {
      if (!componentThemeCache.ThemedComponent) {
        return false;
      }
      if (componentThemeCache.theme !== theme) {
        return false;
      }
      for (const key in componentThemeCache.props as P) {
        const props = componentProps;
        if (props && props[key] !== componentThemeCache.props[key]) {
          return false;
        }
      }

      return true;
    };

    const renderComponent = (ctx: ThemeProviderType) => {
      const { theme, toggleTheme } = ctx;
      if (isPropsSame(theme)) {
        return componentThemeCache.ThemedComponent;
      }
      const colors = getThemeColors(theme);
      const fonts = getThemeFonts(theme);
      const styles = getComponentStyles
        ? getComponentStyles({ colors, fonts, variables, props: componentProps })
        : undefined;
      console.log("rernder component");
      const ThemedComponent = (
        <Component
          {...componentProps as P}
          ref={ref}
          styles={styles}
          theme={theme}
          variables={variables}
          colors={colors}
          fonts={fonts}
          toggleTheme={toggleTheme}
        />
      );

      componentThemeCache = { ...componentThemeCache, props: componentProps, theme, ThemedComponent };

      return ThemedComponent;
    };

    return <ThemeConsumer>{renderComponent}</ThemeConsumer>;
  });
};

export default withTheme;
