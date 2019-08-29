import * as React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Animated,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
} from "react-native";
import Colors from "../Themes/Colors";
import { isWeb, isAndroid } from "../Helpers/platform";

export interface TargetedEvent {
  target: number;
}

type Props = {
  label: string;
  onChange(res: { value: string | undefined; isValid: boolean }): void;
  width: number | string;
  height: number;
  onSuccessInputFieldColor: string;
  textColor: string;
  secureTextEntry: boolean;
  validateValue?(value?: string): string | undefined;
  initialValue?: string;
  onFocus?(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
  onBlur?(e: NativeSyntheticEvent<TargetedEvent>): void;
  maxLabelFontSize: number;
  minLabelFontSize: number;
  maxLabelMarginBottom: number;
  minLabelMarginBottom: number;
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
    | "web-search";
  inputFontSize: number;
  errorFontSize: 12;
  errorColor: string;
  borderBottomWidth: number;
  nativeTextInputProps?: TextInputProps;
};

type State = {
  labelFontSize: Animated.Value;
  labelMarginBottom: Animated.Value;
  value?: string;
  error?: string;
};

class Input extends React.PureComponent<Props, State> {
  static defaultProps = {
    onSuccessInputFieldColor: Colors.themeColor,
    textColor: Colors.defaultText,
    secureTextEntry: false,
    keyboardType: "default",
    width: "100%",
    height: 84,
    maxLabelFontSize: 14,
    minLabelFontSize: 12,
    maxLabelMarginBottom: isWeb ? 16 : 0,
    minLabelMarginBottom: isWeb ? -24 : isAndroid ? -34 : -28,
    inputFontSize: 14,
    errorFontSize: 12,
    errorColor: Colors.error,
    borderBottomWidth: 1,
  };
  public state = {
    value: this.props.initialValue,
    error: undefined,
    labelFontSize: this.props.initialValue
      ? new Animated.Value(this.props.minLabelFontSize)
      : new Animated.Value(this.props.maxLabelFontSize),
    labelMarginBottom: this.props.initialValue
      ? new Animated.Value(this.props.maxLabelFontSize)
      : new Animated.Value(this.props.minLabelMarginBottom),
  };
  public render() {
    const { labelFontSize, labelMarginBottom } = this.state;
    const { width, height, errorFontSize, errorColor } = this.props;
    return (
      <Animated.View style={[styles.container, { width, height }]}>
        <Animated.Text
          style={{ fontSize: labelFontSize, marginBottom: labelMarginBottom, color: this.setLabelColor() }}>
          {this.props.label}
        </Animated.Text>
        {this.renderInput()}
        <Text style={[styles.error, { fontSize: errorFontSize, color: errorColor }]}>{this.state.error}</Text>
      </Animated.View>
    );
  }

  private renderInput = () => {
    const {
      secureTextEntry,
      keyboardType,
      textColor,
      nativeTextInputProps,
      borderBottomWidth,
      inputFontSize,
    } = this.props;
    return (
      <TextInput
        keyboardType={keyboardType}
        style={[
          styles.textInput,
          { borderBottomColor: this.setFieldColor(), color: textColor, borderBottomWidth, fontSize: inputFontSize },
        ]}
        secureTextEntry={secureTextEntry}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        value={this.state.value}
        onChangeText={this.onChangeText}
        {...nativeTextInputProps}
      />
    );
  };

  private onFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (this.props.onFocus) this.props.onFocus(event);
    this.animateLabelUp();
  };

  private onBlur = (event: NativeSyntheticEvent<TargetedEvent>) => {
    if (this.props.onBlur) this.props.onBlur(event);
    this.animateLabelDown();
  };

  private animateLabelUp = () => {
    Animated.parallel([
      Animated.timing(this.state.labelFontSize, {
        toValue: this.props.minLabelFontSize,
        duration: 250,
      }),
      Animated.timing(this.state.labelMarginBottom, {
        toValue: this.props.maxLabelMarginBottom,
        duration: 250,
      }),
    ]).start();
  };

  private animateLabelDown = () => {
    if (!this.state.value) {
      Animated.parallel([
        Animated.timing(this.state.labelFontSize, {
          toValue: this.props.maxLabelFontSize,
          duration: 250,
        }),
        Animated.timing(this.state.labelMarginBottom, {
          toValue: this.props.minLabelMarginBottom,
          duration: 250,
        }),
      ]).start();
    }
  };

  private setLabelColor = () => {
    if (!this.state.value) {
      return Colors.palette.lightGray;
    }
    if (this.state.error) {
      return this.props.errorColor;
    }
    return this.props.textColor;
  };

  private setFieldColor = () => {
    if (!this.state.value) {
      return Colors.palette.lightGray;
    }
    if (this.state.error) {
      return this.props.errorColor;
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
    height: 24,
  },
});

export default Input;
