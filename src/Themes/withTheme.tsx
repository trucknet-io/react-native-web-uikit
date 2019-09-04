import { getColor, ColorType, ColorThemeNames } from "./Colors";
import * as React from "react";
import getVariables, { VariablesType } from "./Variables";
import { getFont, FontType } from "./Fonts";
import { ThemeConsumer, ThemeProviderType } from "src/Contexts/ThemeContext";

export type ThemeType = ColorThemeNames;

export type SetStyleParamsType = {
  color: ColorType;
  font: FontType;
  variables: VariablesType;
};

type GetComponentStyle<S> = (theme: SetStyleParamsType) => S;

export interface WithTheme<S> {
  style: S;
  theme: ColorThemeNames;
  variables: VariablesType;
  color: ColorType;
  font: FontType;
  switchTheme: () => void;
}

type ComponentProps<P, S> = Pick<P, Exclude<keyof P, keyof WithTheme<S>>>;

const withTheme = <P, S>(getComponentStyle?: GetComponentStyle<S>) => (Component: React.ComponentClass<P>) => {
  return class WithContextHOC extends React.PureComponent<ComponentProps<P, S>> {
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
