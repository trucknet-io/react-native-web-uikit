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

const InputField = React.forwardRef((props: FieldProps, ref: React.Ref<TextInput>) => {
  const {
    initialValue,
    secureTextEntry,
    keyboardType,
    color,
    onChangeText,
    borderBottomColor,
    onSubmitEditing,
    textInputProps,
  } = props;
  return (
    <TextInput
      {...textInputProps}
      ref={ref}
      defaultValue={initialValue}
      keyboardType={keyboardType}
      style={[
        styles.textInput,
        {
          borderBottomColor,
          color,
        },
        props.style,
      ]}
      secureTextEntry={secureTextEntry}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
    />
  );
});

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    paddingVertical: 4,
  },
});

export default InputField;
