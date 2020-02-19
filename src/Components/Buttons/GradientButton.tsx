import * as React from "react";
import {
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  FlexAlignType,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import Colors from "src/Themes/Colors";
import getShadowStyle from "src/Themes/getShadowStyle";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

import LinearGradient from "src/Components/LinearGradient/LinearGradient";

type Styles = ReturnType<typeof getStyles>;

interface DefaultProps {
  gradientStartColor: string;
  gradientEndColor: string;
  borderRadius: number;
  width: string | number;
  marginVertical: string | number;
  marginHorizontal: string | number;
  alignItems?: FlexAlignType;
}

interface OwnProps extends TouchableOpacityProps, DefaultProps {
  label?: React.ReactNode;
  borderWidth?: 0;
  borderColor?: string;
}

interface Props extends OwnProps, ThemeProps<Styles> {}

export type GradientButtonProps = Omit<Props, keyof DefaultProps> & Partial<DefaultProps>;

export class GradientButtonComponent extends React.PureComponent<Props> {
  private PRESS_IN_SHADOW = 1;
  private PRESS_OUT_SHADOW = 4;

  public static defaultProps: DefaultProps = {
    gradientStartColor: Colors.themeGradient.gradientColor1,
    gradientEndColor: Colors.themeGradient.gradientColor2,
    borderRadius: 4,
    width: "100%",
    marginVertical: 0,
    marginHorizontal: 0,
    alignItems: "center",
  };

  public state = {
    shadow: getShadowStyle(this.PRESS_OUT_SHADOW),
  };

  public render() {
    const { gradientStartColor, gradientEndColor, styles, ...rest } = this.props;
    return (
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        gradientStartColor={this.getColor(gradientStartColor)}
        gradientEndColor={this.getColor(gradientEndColor)}
        style={[styles.linearGradient, this.state.shadow, this.props.style]}>
        <TouchableOpacity
          {...rest}
          style={[styles.buttonContainer, this.props.style]}
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}>
          {this.renderChildren()}
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  private renderChildren = () => {
    if (this.props.children) {
      return this.props.children;
    }
    return <Text style={this.props.styles.buttonLabel}>{this.props.label}</Text>;
  };

  private getColor = (gradientColor: string) => {
    if (this.props.disabled) return Colors.palette.veryVeryLightGray;
    return gradientColor;
  };

  private handlePressIn = (e: GestureResponderEvent) => {
    this.setState({ shadow: getShadowStyle(this.PRESS_IN_SHADOW) }, () => {
      if (this.props.onPressIn) {
        this.props.onPressIn(e);
      }
    });
  };
  private handlePressOut = (e: GestureResponderEvent) => {
    this.setState({ shadow: getShadowStyle(this.PRESS_OUT_SHADOW) }, () => {
      if (this.props.onPressOut) {
        this.props.onPressOut(e);
      }
    });
  };
}

const getStyles = ({
  variables,
  colors,
  props: { width, marginVertical, marginHorizontal, borderRadius, alignItems, disabled },
}: ThemeParamsType<OwnProps>) => {
  return StyleSheet.create({
    linearGradient: {
      justifyContent: "center",
      flexDirection: "row",
      paddingVertical: variables.size.s,
      width,
      marginVertical,
      marginHorizontal,
      borderRadius,
      alignItems,
      ...variables.shadow,
    },
    buttonContainer: {
      justifyContent: "center",
      flexDirection: "row",
      width,
      alignItems,
    },
    buttonLabel: {
      color: disabled ? colors.disable : colors.buttonText,
    },
  });
};
const GradientButton = withTheme<Props, DefaultProps>(getStyles)(GradientButtonComponent);

export { GradientButton };
