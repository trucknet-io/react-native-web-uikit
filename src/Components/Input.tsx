import * as React from "react";
import { StyleSheet, Text, TextInput, Animated } from "react-native";
import Colors from "../Themes/Colors";
import { isWeb } from "../Helpers/platform";

type Props = {
  label: string;
  onChange(res: { value: string | undefined; isValid: boolean }): void;
  width: number | string;
  height: number;
  onSuccessInputFieldColor: string;
  secureTextEntry: boolean;
  validateValue?(value?: string): string | undefined;
  initialValue?: string;
  onInputFocus?(): void;
  onInputBlur?(): void;
  keyboardType:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "visible-password"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "number-pad"
    | "name-phone-pad"
    | "decimal-pad"
    | "twitter"
    | "web-search"
    | undefined;
};

type State = {
  labelFontSize: Animated.Value;
  labelMarginBottom: Animated.Value;
  value?: string;
  error?: string;
};

class Input extends React.PureComponent<Props, State> {
  maxLabelFontSize = 16;
  minLabelFontSize = 12;
  maxLabelMarginBottom = isWeb ? 16 : 0;
  minLabelMarginBottom = isWeb ? -24 : -34;
  static defaultProps = {
    onSuccessInputFieldColor: Colors.lime,
    secureTextEntry: false,
    keyboardType: "default",
    width: "100%",
    height: 84,
  };
  public state = {
    value: this.props.initialValue,
    error: undefined,
    labelFontSize: this.props.initialValue
      ? new Animated.Value(this.minLabelFontSize)
      : new Animated.Value(this.maxLabelFontSize),
    labelMarginBottom: this.props.initialValue
      ? new Animated.Value(this.maxLabelFontSize)
      : new Animated.Value(this.minLabelMarginBottom),
  };
  public render() {
    const { labelFontSize, labelMarginBottom } = this.state;
    const { width, height } = this.props;
    return (
      <Animated.View style={[styles.container, { width, height }]}>
        <Animated.Text
          style={{ fontSize: labelFontSize, marginBottom: labelMarginBottom, color: this.setLabelColor() }}>
          {this.props.label}
        </Animated.Text>
        {this.renderInput()}
        <Text style={styles.error}>{this.state.error}</Text>
      </Animated.View>
    );
  }

  private renderInput = () => {
    const { secureTextEntry, keyboardType } = this.props;
    return (
      <TextInput
        keyboardType={keyboardType}
        style={[styles.textInput, { borderBottomColor: this.setFieldColor() }]}
        secureTextEntry={secureTextEntry}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        value={this.state.value}
        onChangeText={this.onChangeText}
      />
    );
  };

  private onFocus = () => {
    if (this.props.onInputFocus) this.props.onInputFocus();
    this.animateLabelUp();
  };

  private onBlur = () => {
    if (this.props.onInputBlur) this.props.onInputBlur();
    this.animateLabelDown();
  };

  private animateLabelUp = () => {
    Animated.parallel([
      Animated.timing(this.state.labelFontSize, {
        toValue: this.minLabelFontSize,
        duration: 250,
      }),
      Animated.timing(this.state.labelMarginBottom, {
        toValue: this.maxLabelMarginBottom,
        duration: 250,
      }),
    ]).start();
  };

  private animateLabelDown = () => {
    if (!this.state.value) {
      Animated.parallel([
        Animated.timing(this.state.labelFontSize, {
          toValue: this.maxLabelFontSize,
          duration: 250,
        }),
        Animated.timing(this.state.labelMarginBottom, {
          toValue: this.minLabelMarginBottom,
          duration: 250,
        }),
      ]).start();
    }
  };

  private setLabelColor = () => {
    if (!this.state.value) {
      return Colors.lightGray;
    }
    if (this.state.error) {
      return Colors.error;
    }
    return Colors.defaultText;
  };

  private setFieldColor = () => {
    if (!this.state.value) {
      return Colors.lightGray;
    }
    if (this.state.error) {
      return Colors.error;
    }
    return this.props.onSuccessInputFieldColor;
  };

  private onChangeText = (value) => {
    this.setState({ value }, this.validate);
  };

  private validate = () => {
    const { validateValue } = this.props;
    if (validateValue) {
      return this.setState({ error: validateValue(this.state.value) }, this.setValue);
    }

    return this.setValue();
  };

  private setValue = () => {
    this.props.onChange({ value: this.state.value, isValid: !this.state.error });
  };
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
  },
  textInput: {
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 8,
  },
  error: {
    fontSize: 12,
    color: Colors.error,
    height: 24,
  },
});

export default Input;
