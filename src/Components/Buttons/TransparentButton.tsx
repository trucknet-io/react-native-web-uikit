import * as React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps, FlexAlignType } from "react-native";
import { styles } from "./styles";
import withTheme, { ThemeProps } from "src/Themes/withTheme";

interface DefaultProps {
  borderWidth: number;
  borderRadius: number;
  width: string | number;
  marginVertical: string | number;
  marginHorizontal: string | number;
  alignItems: FlexAlignType;
}
interface Props extends ThemeProps, DefaultProps, TouchableOpacityProps {
  label?: React.ReactNode;
  link?: React.ReactNode;
}

export type TransparentButtonProps = Omit<Props, keyof DefaultProps> & Partial<DefaultProps>;

class Button extends React.PureComponent<Props> {
  public static defaultProps: DefaultProps = {
    borderWidth: 0,
    borderRadius: 4,
    width: "100%",
    marginVertical: 0,
    marginHorizontal: 0,
    alignItems: "center",
  };
  public render() {
    const { width, marginVertical, marginHorizontal, borderRadius, alignItems, style, borderWidth } = this.props;
    return (
      <TouchableOpacity
        {...this.props}
        style={[
          styles.buttonContainer,
          {
            width,
            marginVertical,
            marginHorizontal,
            borderRadius,
            alignItems,
            borderWidth,
            borderColor: this.props.colors.defaultText,
          },
          style,
        ]}>
        {this.renderChildren()}
      </TouchableOpacity>
    );
  }
  private renderChildren = () => {
    if (this.props.children) {
      return this.props.children;
    }
    if (this.props.link) {
      return (
        <React.Fragment>
          <Text style={[styles.buttonText, { color: this.props.colors.defaultText }]}>{this.props.label}</Text>
          <Text style={[styles.buttonLinkText, { color: this.props.colors.link }]}>{this.props.link}</Text>
        </React.Fragment>
      );
    }
    return <Text style={[styles.buttonLabel, { color: this.props.colors.defaultText }]}>{this.props.label}</Text>;
  };
}

const TransparentButton = withTheme<Props, DefaultProps>()(Button);

export { TransparentButton };
