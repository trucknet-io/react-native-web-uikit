import * as React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
  TextInputSubmitEditingEventData,
  TextStyle,
  ViewStyle,
  View,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from "react-native";
import Colors from "src/Themes/Colors";

export interface TargetedEvent {
  target: number;
}

type InputTextStyle = Omit<TextStyle, "paddingVertical">;
interface IFieldTextStyle extends InputTextStyle {
  paddingVertical: number;
}
interface Props {
  label: React.ReactNode;
  labelFontSize?: number;
  onChangeTextValidated(res: { value: string | undefined; isValid: boolean }): void;
  width: number | string;
  onSuccessInputFieldColor: string;
  textColor: string;
  validateValue?(value?: string): React.ReactNode | void;
  secureTextEntry: boolean;
  initialValue?: string;
  onFocus?(e: GestureResponderEvent | NativeSyntheticEvent<TextInputFocusEventData>): void;
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
  value?: string;
  error: React.ReactNode | void;
};

class Input extends React.PureComponent<Props, State> {
  private textInput?: TextInput;

  static defaultProps = {
    onSuccessInputFieldColor: Colors.themeColor,
    textColor: Colors.defaultText,
    secureTextEntry: false,
    keyboardType: "default",
    width: "100%",
    errorFontSize: 12,
    errorColor: Colors.error,
    labelFontSize: 14,
  };

  state = {
    value: this.props.initialValue,
    error: undefined,
  };

  public focus = () => {
    if (this.textInput) {
      this.textInput.focus();
    }
  };

  public render() {
    const { width, errorFontSize, errorColor } = this.props;
    return (
      <View style={[styles.container, { width }, this.props.style]}>
        <TouchableWithoutFeedback onPress={this.handleFocus}>
          <Text
            style={[
              styles.label,
              {
                fontSize: this.props.labelFontSize,
                color: this.getLabelColor(),
              },
            ]}>
            {this.props.label}
          </Text>
        </TouchableWithoutFeedback>
        <Field
          textInputProps={this.props.textInputProps}
          setInputRef={this.setInputRef}
          secureTextEntry={this.props.secureTextEntry}
          keyboardType={this.props.keyboardType}
          style={this.props.style}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onSubmitEditing={this.onSubmitEditing}
          onChangeText={this.handleChangeText}
          borderBottomColor={this.getFieldColor()}
          color={this.props.textColor}
          initialValue={this.props.initialValue}
        />
        <Text style={[styles.error, { fontSize: errorFontSize, color: errorColor }]}>{this.state.error}</Text>
      </View>
    );
  }

  private handleFocus = (event: GestureResponderEvent | NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (this.props.onFocus) this.props.onFocus(event);
    if (this.textInput) this.textInput.focus();
  };

  private handleBlur = (event: NativeSyntheticEvent<TargetedEvent>) => {
    if (this.props.onBlur) this.props.onBlur(event);
  };

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
  textInputProps?: TextInputProps;
  onChangeText(value: string): void;
  borderBottomColor: string;
  setInputRef(TextInput): void;
  onSubmitEditing(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>): void;
  initialValue?: string;
  secureTextEntry?: boolean;
  color?: string;
  nativeTextInputProps?: TextInputProps;
  onFocus?(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
  onBlur?(e: NativeSyntheticEvent<TargetedEvent>): void;
  style?: ViewStyle;
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
  state = {
    value: this.props.initialValue,
    error: undefined,
  };

  render() {
    const {
      initialValue,
      secureTextEntry,
      keyboardType,
      color,
      onChangeText,
      borderBottomColor,
      onSubmitEditing,
      setInputRef,
      textInputProps,
    } = this.props;
    return (
      <TextInput
        {...textInputProps}
        accessible
        ref={setInputRef}
        defaultValue={initialValue}
        keyboardType={keyboardType}
        allowFontScaling={false}
        style={[
          styles.textInput,
          {
            borderBottomColor,
            color,
          },
          this.props.style,
        ]}
        secureTextEntry={secureTextEntry}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flex: 1,
    justifyContent: "flex-end",
  },
  textInput: {
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    paddingVertical: 4,
  },
  error: {
    height: 24,
  },
  label: {
    paddingBottom: 4,
  },
});

export default Input;
