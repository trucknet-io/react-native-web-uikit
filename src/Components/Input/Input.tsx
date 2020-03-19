import React, { useState, useEffect } from "react";
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
import InputField, { TargetedEvent } from "./InputField";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Style = ReturnType<typeof getStyle>;

interface DefaultProps {
  secureTextEntry: boolean;
  keyboardType: KeyboardType;
  width: number | string;
}

interface OwnProps {
  label: React.ReactNode;
  labelStyle?: TextStyle;
  onChangeTextValidated(res: { value: string | undefined; isValid: boolean }): void;
  validateValue?(value?: string): React.ReactNode;
  initialValue?: string;
  onFocus?(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
  onBlur?(e: NativeSyntheticEvent<TargetedEvent>): void;
  onSubmitEditing?(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>): void;
  textInputStyle?: TextStyle;
  textInputProps?: TextInputProps;
  isRequired?: boolean;
}

interface Props extends ThemeProps<Style>, DefaultProps, OwnProps {}

type State = {
  value?: string;
  error: React.ReactNode;
  isPure: boolean;
};

export const PureInput = React.forwardRef((props: Props, ref: React.Ref<TextInput>) => {
  const [value, setValue] = useState<State["value"]>(props.initialValue);
  const [isPure, setIsPure] = useState<State["isPure"]>(true);
  const [error, setError] = useState<State["error"]>(undefined);

  useEffect(
    () => {
      props.onChangeTextValidated({ value, isValid: !error });
    },
    [value, error],
  );

  useEffect(
    () => {
      const { validateValue } = props;
      if (!validateValue) return;
      setError(validateValue(value));
    },
    [value],
  );

  const setInputValue = (value: string) => {
    if (isPure) {
      setIsPure(false);
    }
    setValue(value);
  };

  const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (props.onFocus) props.onFocus(event);
  };

  const handleBlur = (event: NativeSyntheticEvent<TargetedEvent>) => {
    if (props.onBlur) props.onBlur(event);
  };

  const handleSubmitEditing = (e) => {
    if (props.onSubmitEditing) {
      props.onSubmitEditing(e);
    }
  };

  const initialColor = props.isRequired ? props.colors.error : props.colors.palette.lightGray;

  const getLabelColor = () => {
    if (!value) {
      return initialColor;
    }
    if (error) {
      return props.colors.error;
    }
    return props.colors.defaultText;
  };

  const getFieldColor = () => {
    if (!value) {
      return initialColor;
    }
    if (error) {
      return props.colors.error;
    }
    return props.colors.themeColor;
  };

  const { width, styles } = props;

  return (
    <View style={[styles.container, { width }]}>
      <TouchableWithoutFeedback>
        <Text
          style={[
            styles.label,
            {
              color: getLabelColor(),
            },
            props.labelStyle,
          ]}>
          {props.label} {props.isRequired ? "*" : null}
        </Text>
      </TouchableWithoutFeedback>
      <InputField
        ref={ref}
        textInputProps={props.textInputProps}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        style={props.textInputStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={handleSubmitEditing}
        onChangeText={setInputValue}
        borderBottomColor={getFieldColor()}
        color={props.colors.defaultText}
        initialValue={props.initialValue}
      />
      <Text style={styles.error}>{isPure ? null : error}</Text>
    </View>
  );
});

PureInput.defaultProps = {
  secureTextEntry: false,
  keyboardType: "default",
  width: "100%",
};

const getStyle = ({ fonts, colors }: ThemeParamsType) => {
  return StyleSheet.create({
    container: {
      marginTop: 16,
      flexGrow: 1,
      justifyContent: "flex-end",
    },
    error: {
      height: 24,
      ...fonts.BodySmall,
      color: colors.error,
    },
    label: fonts.BodyRegular,
  });
};

export default withTheme<Props, DefaultProps>(getStyle)(PureInput);
