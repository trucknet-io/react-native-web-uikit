import * as React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps, FlexAlignType, StyleSheet } from "react-native";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Styles = ReturnType<typeof getStyles>;

interface DefaultProps {
  borderWidth: number;
  borderRadius: number;
  marginVertical: string | number;
  marginHorizontal: string | number;
  alignItems: FlexAlignType;
}

interface OwnProps extends DefaultProps, TouchableOpacityProps {
  label?: React.ReactNode;
  link?: React.ReactNode;
  children?: React.ReactNode;
}

interface Props extends ThemeProps<Styles>, OwnProps {}

export type TransparentButtonProps = Omit<Props, keyof DefaultProps> & Partial<DefaultProps>;

export class PureTransparentButton extends React.PureComponent<Props> {
  public static defaultProps: DefaultProps = {
    borderWidth: 0,
    borderRadius: 4,
    marginVertical: 0,
    marginHorizontal: 0,
    alignItems: "center",
  };
  public render() {
    const { styles, ...rest } = this.props;
    return (
      <TouchableOpacity {...rest} style={[styles.buttonContainer, this.props.style]}>
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
          <Text style={this.props.styles.buttonText}>{this.props.label}</Text>
          <Text style={this.props.styles.buttonLinkText}>{this.props.link}</Text>
        </React.Fragment>
      );
    }
    return <Text style={this.props.styles.buttonLabel}>{this.props.label}</Text>;
  };
}

const getStyles = ({
  variables,
  colors,
  props: { marginVertical, marginHorizontal, borderRadius, alignItems, borderWidth },
}: ThemeParamsType<OwnProps>) =>
  StyleSheet.create({
    buttonContainer: {
      justifyContent: "center",
      flexDirection: "row",
      paddingVertical: variables.size.s,
      marginVertical,
      marginHorizontal,
      borderRadius,
      alignItems,
      borderWidth,
      borderColor: colors.defaultText,
    },
    buttonText: {
      color: colors.defaultText,
    },
    buttonLabel: {
      color: colors.defaultText,
    },
    buttonLinkText: {
      textDecorationLine: "underline",
      color: colors.link,
      marginHorizontal: variables.size.xs,
    },
  });
const TransparentButton = withTheme<Props, DefaultProps>(getStyles)(PureTransparentButton);

export { TransparentButton };
