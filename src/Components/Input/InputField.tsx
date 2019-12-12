import * as React from "react";
import {
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
  TextInputSubmitEditingEventData,
  ViewStyle,
  KeyboardType,
} from "react-native";

export interface TargetedEvent {
  target: number;
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
  keyboardType: KeyboardType;
};

class InputField extends React.Component<FieldProps> {
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
        ref={setInputRef}
        defaultValue={initialValue}
        keyboardType={keyboardType}
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
  textInput: {
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    paddingVertical: 4,
  },
});

export default InputField;
