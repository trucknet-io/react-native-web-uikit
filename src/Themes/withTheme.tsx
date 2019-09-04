import { getColor, ColorType, ColorThemeNames } from "./Colors";
import * as React from "react";
import getVariables, { GetVariablesType } from "./Variables";
import { getFont } from "./Fonts";
import { ThemeConsumer, ThemeProviderType } from "src/Contexts/ThemeContext";

export type SetStyleParamsType = {
  color: ColorType;
  font: ReturnType<typeof getFont>;
  variables: GetVariablesType;
};

type GetComponentStyle<S> = (theme: SetStyleParamsType) => S;

export interface WithStyle<S> {
  style: S;
  theme: ColorThemeNames;
  variables: GetVariablesType;
  color: ColorType;
  font: ReturnType<typeof getFont>;
  switchTheme: () => void;
}

type ComponentProps<P, S> = Pick<P, Exclude<keyof P, keyof WithStyle<S>>>;

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
