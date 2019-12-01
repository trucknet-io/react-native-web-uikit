import * as React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Animated,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
  TextInputSubmitEditingEventData,
} from "react-native";
import Colors from "src/Themes/Colors";
import { isWeb, isAndroid } from "src/Helpers/platform";

export interface TargetedEvent {
  target: number;
}

interface Props extends TextInputProps {
  label: string;
  onChangeTextValidated(res: { value: string | undefined; isValid: boolean }): void;
  width: number | string;
  height: number;
  onSuccessInputFieldColor: string;
  textColor: string;
  secureTextEntry: boolean;
  validateValue?(value?: string): string | void;
  initialValue?: string;
  onFocus?(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
  onBlur?(e: NativeSyntheticEvent<TargetedEvent>): void;
  onSubmitEditing?(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>): void;
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
}

type State = {
  labelFontSize: Animated.Value;
  labelMarginBottom: Animated.Value;
  value?: string;
  error: string | void;
};

class Input extends React.PureComponent<Props, State> {
  textInput?: TextInput;
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

  state = {
    value: this.props.initialValue,
    error: undefined,
    labelFontSize: this.props.initialValue
      ? new Animated.Value(this.props.minLabelFontSize)
      : new Animated.Value(this.props.maxLabelFontSize),
    labelMarginBottom: this.props.initialValue
      ? new Animated.Value(this.props.maxLabelFontSize)
      : new Animated.Value(this.props.minLabelMarginBottom),
  };

  public focus = () => {
    if (this.textInput) {
      this.textInput.focus();
    }
  };

  public render() {
    const { labelFontSize, labelMarginBottom } = this.state;
    const { width, height, errorFontSize, errorColor } = this.props;
    return (
      <Animated.View style={[styles.container, { width, height }, this.props.style]}>
        <Animated.Text
          style={{ fontSize: labelFontSize, marginBottom: labelMarginBottom, color: this.getLabelColor() }}>
          {this.props.label}
        </Animated.Text>
        <Field
          {...this.props}
          setInputRef={this.setInputRef}
          secureTextEntry={this.props.secureTextEntry}
          keyboardType={this.props.keyboardType}
          textColor={this.props.textColor}
          borderBottomWidth={this.props.borderBottomWidth}
          inputFontSize={this.props.inputFontSize}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onSubmitEditing={this.onSubmitEditing}
          onChangeText={this.handleChangeText}
          inputBorderColor={this.getFieldColor()}
          initialValue={this.props.initialValue}
        />
        <Text style={[styles.error, { fontSize: errorFontSize, color: errorColor }]}>{this.state.error}</Text>
      </Animated.View>
    );
  }

  private onSubmitEditing = (e) => {
    if (this.props.onSubmitEditing) {
      this.props.onSubmitEditing(e);
    }
  };

  private setInputRef = (el: TextInput) => {
    this.textInput = el;
  };

  private handleChangeText = (value: string) => {
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
    this.props.onChangeTextValidated({ value: this.state.value, isValid: !this.state.error });
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

  private getLabelColor = () => {
    if (!this.state.value) {
      return Colors.palette.lightGray;
    }
    if (this.state.error) {
      return this.props.errorColor;
    }
    return this.props.textColor;
  };

  private getFieldColor = () => {
    if (!this.state.value) {
      return Colors.palette.lightGray;
    }
    if (this.state.error) {
      return this.props.errorColor;
    }
    return this.props.onSuccessInputFieldColor;
  };
}

type FieldProps = {
  onChangeText(value: string): void;
  inputBorderColor: string;
  setInputRef(TextInput): void;
  borderBottomWidth: number;
  inputFontSize: number;
  onSubmitEditing(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>): void;
  initialValue?: string;
  secureTextEntry?: boolean;
  textColor?: string;
  nativeTextInputProps?: TextInputProps;
  onFocus?(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
  onBlur?(e: NativeSyntheticEvent<TargetedEvent>): void;
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
};

class Field extends React.Component<FieldProps> {
  render() {
    const {
      initialValue,
      secureTextEntry,
      keyboardType,
      textColor,
      borderBottomWidth,
      inputFontSize,
      onFocus,
      onBlur,
      onChangeText,
      inputBorderColor,
      onSubmitEditing,
      setInputRef,
    } = this.props;
    return (
      <TextInput
        {...this.props}
        ref={setInputRef}
        defaultValue={initialValue}
        keyboardType={keyboardType}
        style={[
          styles.textInput,
          { borderBottomColor: inputBorderColor, color: textColor, borderBottomWidth, fontSize: inputFontSize },
        ]}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
    );
  }
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
