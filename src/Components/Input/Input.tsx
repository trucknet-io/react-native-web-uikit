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
  TextStyle,
  ViewStyle,
} from "react-native";
import Colors from "src/Themes/Colors";

export interface TargetedEvent {
  target: number;
}

type InputTextStyle = Omit<TextStyle, "paddingVertical">;
interface IFieldTextStyle extends InputTextStyle {
  paddingVertical: number;
}
interface Props extends TextInputProps {
  label: string;
  onChangeTextValidated(res: { value: string | undefined; isValid: boolean }): void;
  width: number | string;
  onSuccessInputFieldColor: string;
  textColor: string;
  validateValue?(value?: string): string | void;
  initialValue?: string;
  onFocus?(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
  onBlur?(e: NativeSyntheticEvent<TargetedEvent>): void;
  onSubmitEditing?(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>): void;
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
  errorFontSize: 12;
  errorColor: string;
  style?: IFieldTextStyle;
  textInputProps?: TextInputProps;
}

type State = {
  labelFontSize: Animated.Value;
  labelMarginBottom: Animated.Value;
  labelMarginTop: Animated.Value;
  value?: string;
  error: string | void;
};

const DEFAULT_INPUT_FONT_SIZE = 14;
const DEFAULT_INPUT_PADDING_VERTICAL = 2;

class Input extends React.PureComponent<Props, State> {
  private textInput?: TextInput;
  private animationLabelUp;
  private animationLabelDown;

  static defaultProps = {
    onSuccessInputFieldColor: Colors.themeColor,
    textColor: Colors.defaultText,
    secureTextEntry: false,
    keyboardType: "default",
    width: "100%",
    errorFontSize: 12,
    errorColor: Colors.error,
  };

  private inputFontSize = this.getInputFontSize();
  private inputPaddingVertical = this.getInputPaddingVertical();
  private labelInitialMargin = -(this.inputFontSize + this.inputPaddingVertical);

  state = {
    value: this.props.initialValue,
    error: undefined,
    labelFontSize: this.props.initialValue
      ? new Animated.Value(this.inputFontSize - 2)
      : new Animated.Value(this.inputFontSize),
    labelMarginBottom: this.props.initialValue ? new Animated.Value(0) : new Animated.Value(this.labelInitialMargin),
    labelMarginTop: this.props.initialValue ? new Animated.Value(this.labelInitialMargin) : new Animated.Value(0),
  };

  public focus = () => {
    if (this.textInput) {
      this.textInput.focus();
    }
  };

  public componentWillUnmount = () => {
    this.animationLabelUp.stop();
    this.animationLabelDown.stop();
  };

  public render() {
    const { labelFontSize, labelMarginBottom, labelMarginTop } = this.state;
    const { width, errorFontSize, errorColor } = this.props;
    return (
      <Animated.View style={[styles.container, { width }, this.props.style]}>
        <Animated.Text
          style={{
            fontSize: labelFontSize,
            marginTop: labelMarginTop,
            marginBottom: labelMarginBottom,
            color: this.getLabelColor(),
          }}>
          {this.props.label}
        </Animated.Text>
        <Field
          textInputProps={this.props.textInputProps}
          setInputRef={this.setInputRef}
          secureTextEntry={this.props.secureTextEntry}
          keyboardType={this.props.keyboardType}
          style={this.props.style}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onSubmitEditing={this.onSubmitEditing}
          onChangeText={this.handleChangeText}
          borderBottomColor={this.getFieldColor()}
          color={this.props.textColor}
          initialValue={this.props.initialValue}
          paddingVertical={this.inputPaddingVertical}
          fontSize={this.inputFontSize}
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
    this.animationLabelUp = Animated.parallel([
      Animated.timing(this.state.labelFontSize, {
        toValue: this.inputFontSize - 2,
        duration: 250,
      }),
      Animated.timing(this.state.labelMarginBottom, {
        toValue: 0,
        duration: 250,
      }),
      Animated.timing(this.state.labelMarginTop, {
        toValue: this.labelInitialMargin,
        duration: 250,
      }),
    ]);
    this.animationLabelUp.start();
  };

  private animateLabelDown = () => {
    if (!this.state.value) {
      this.animationLabelDown = Animated.parallel([
        Animated.timing(this.state.labelFontSize, {
          toValue: this.inputFontSize,
          duration: 250,
        }),
        Animated.timing(this.state.labelMarginBottom, {
          toValue: this.labelInitialMargin,
          duration: 250,
        }),
        Animated.timing(this.state.labelMarginTop, {
          toValue: 0,
          duration: 250,
        }),
      ]);
      this.animationLabelDown.start();
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

  private getInputFontSize() {
    const { style } = this.props;
    if (style && style.fontSize) {
      return style.fontSize;
    }
    return DEFAULT_INPUT_FONT_SIZE;
  }

  private getInputPaddingVertical() {
    const { style } = this.props;
    if (style && style.paddingVertical) {
      return style.paddingVertical;
    }
    return DEFAULT_INPUT_PADDING_VERTICAL;
  }
}

type FieldProps = {
  textInputProps?: TextInputProps;
  onChangeText(value: string): void;
  borderBottomColor: string;
  setInputRef(TextInput): void;
  fontSize: number;
  onSubmitEditing(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>): void;
  initialValue?: string;
  secureTextEntry?: boolean;
  color?: string;
  nativeTextInputProps?: TextInputProps;
  onFocus?(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
  onBlur?(e: NativeSyntheticEvent<TargetedEvent>): void;
  style?: ViewStyle;
  paddingVertical: number;
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
      color,
      onFocus,
      onBlur,
      onChangeText,
      borderBottomColor,
      onSubmitEditing,
      setInputRef,
      paddingVertical,
      fontSize,
      textInputProps,
    } = this.props;
    return (
      <TextInput
        {...textInputProps}
        accessible
        ref={setInputRef}
        defaultValue={initialValue}
        keyboardType={keyboardType}
        style={[
          styles.textInput,
          {
            fontSize,
            borderBottomColor,
            paddingVertical,
            color,
          },
          this.props.style,
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
    marginTop: 16,
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
