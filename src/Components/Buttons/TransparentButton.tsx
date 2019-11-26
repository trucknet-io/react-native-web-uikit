import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import Colors from "src/Themes/Colors";
import { styles } from "./styles";
import { defaultButtonProps } from "./commonDefaultProps";
import { ButtonProps } from "./commonTypes";

interface TransparentButtonProps extends ButtonProps {
  linkColor: string;
  borderWidth: number;
  borderColor: string;
  link?: string;
}

export class TransparentButton extends React.PureComponent<TransparentButtonProps> {
  public static defaultProps = {
    linkColor: Colors.buttonText,
    borderWidth: 0,
    borderColor: Colors.defaultText,
    ...defaultButtonProps,
  };
  public render() {
    const {
      width,
      marginVertical,
      marginHorizontal,
      borderRadius,
      alignItems,
      style,
      borderWidth,
      borderColor,
    } = this.props;
    return (
      <TouchableOpacity
        {...this.props}
        style={[
          styles.buttonContainer,
          { width, marginVertical, marginHorizontal, borderRadius, alignItems, borderWidth, borderColor },
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
          <Text style={[styles.buttonText, { color: this.props.textColor }]}>{this.props.label}</Text>
          <Text style={[styles.buttonLinkText, { color: this.props.linkColor }]}>{this.props.link}</Text>
        </React.Fragment>
      );
    }
    return <Text style={[styles.buttonLabel, { color: this.props.textColor }]}>{this.props.label}</Text>;
  };
}
