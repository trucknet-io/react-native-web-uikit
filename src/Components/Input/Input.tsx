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
  View,
  TouchableWithoutFeedback,
  KeyboardType,
} from "react-native";
import Colors from "src/Themes/Colors";
import InputField, { TargetedEvent } from "./InputField";
import Fonts from "src/Themes/Fonts";

interface Props {
  label: React.ReactNode;
  labelStyle?: TextStyle;
  onChangeTextValidated(res: { value: string | undefined; isValid: boolean }): void;
  width: number | string;
  onSuccessInputFieldColor: string;
  textColor: string;
  validateValue?(value?: string): React.ReactNode | void;
  secureTextEntry: boolean;
  initialValue?: string;
  onFocus?(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
  onBlur?(e: NativeSyntheticEvent<TargetedEvent>): void;
  onSubmitEditing?(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>): void;
  keyboardType: KeyboardType;
  errorFontSize: number;
  errorColor: string;
  textInputStyle?: TextStyle;
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
      <View style={[styles.container, { width }]}>
        <TouchableWithoutFeedback onPress={this.handleLabelPress}>
          <Text
            style={[
              styles.label,
              {
                color: this.getLabelColor(),
              },
              this.props.labelStyle,
            ]}>
            {this.props.label}
          </Text>
        </TouchableWithoutFeedback>
        <InputField
          textInputProps={this.props.textInputProps}
          setInputRef={this.setInputRef}
          secureTextEntry={this.props.secureTextEntry}
          keyboardType={this.props.keyboardType}
          style={this.props.textInputStyle}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onSubmitEditing={this.handleSubmitEditing}
          onChangeText={this.handleChangeText}
          borderBottomColor={this.getFieldColor()}
          color={this.props.textColor}
          initialValue={this.props.initialValue}
        />
        <Text style={[styles.error, { fontSize: errorFontSize, color: errorColor }]}>{this.state.error}</Text>
      </View>
    );
  }

  private handleLabelPress = () => {
    if (this.textInput) this.textInput.focus();
  };

  private handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (this.props.onFocus) this.props.onFocus(event);
  };

  private handleBlur = (event: NativeSyntheticEvent<TargetedEvent>) => {
    if (this.props.onBlur) this.props.onBlur(event);
  };

  private handleSubmitEditing = (e) => {
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

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flex: 1,
    justifyContent: "flex-end",
  },
  error: {
    height: 24,
  },
  label: Fonts.style.BodyRegular,
});

export default Input;
