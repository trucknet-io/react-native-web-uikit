import { getColor, ColorType, ColorThemeNames } from "./Colors";
import * as React from "react";
import getVariables, { VariablesType } from "./Variables";
import { getFont, FontType } from "./Fonts";
import { ThemeConsumer, ThemeProviderType } from "../Contexts/ThemeContext";

export type ThemeType = ColorThemeNames;

export type SetStyleParamsType = {
  color: ColorType;
  font: FontType;
  variables: VariablesType;
};

type GetComponentStyle<S> = (theme: SetStyleParamsType) => S;

export interface ThemeProps<S> {
  style: S;
  theme: ColorThemeNames;
  variables: VariablesType;
  color: ColorType;
  font: FontType;
  switchTheme: () => void;
}

type WithOutThemeProps<P, S> = Pick<P, Exclude<keyof P, keyof ThemeProps<S>>>;
type WithOutProps<P, D> = Pick<P, Exclude<keyof P, keyof D>>;

const withTheme = <P, S = {}, D = {}>(getComponentStyle?: GetComponentStyle<S>) => (
  Component: React.ComponentClass<P>,
) => {
  type WithoutThemeProps = WithOutThemeProps<P, S>;
  type ComponentWithoutDefaultProps = WithOutProps<WithoutThemeProps, D>;
  /**
   * get defaultProps from P because D can has wrong typing
   */
  type ComponentDefaultProps = WithOutProps<WithoutThemeProps, ComponentWithoutDefaultProps>;
  type ComponentProps = ComponentWithoutDefaultProps & Partial<ComponentDefaultProps>;
  return class WithContextHOC extends React.PureComponent<ComponentProps> {
    public render() {
      return <ThemeConsumer>{this.renderComponent}</ThemeConsumer>;
    }

    public renderComponent = (ctx: ThemeProviderType) => {
      const { theme, windowSize, switchTheme } = ctx;
      const color = getColor(theme);
      const font = getFont(theme);
      const variables = getVariables(windowSize);
      const style = getComponentStyle ? getComponentStyle({ color, font, variables }) : undefined;
      const componentOwnProps = this.props as P;
      return (
        <Component
          {...componentOwnProps}
          style={style}
          theme={theme}
          variables={variables}
          color={color}
          font={font}
          switchTheme={switchTheme}
        />
      );
    };
  };
};

export default withTheme;
