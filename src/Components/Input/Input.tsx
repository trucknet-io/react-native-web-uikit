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
import InputField, { TargetedEvent } from "./InputField";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Style = ReturnType<typeof getStyle>;

interface DefaultProps {
  secureTextEntry: boolean;
  keyboardType: KeyboardType;
  width: number | string;
}

interface Props extends ThemeProps<Style>, DefaultProps {
  label: React.ReactNode;
  labelStyle?: TextStyle;
  onChangeTextValidated(res: { value: string | undefined; isValid: boolean }): void;
  validateValue?(value?: string): React.ReactNode | void;
  initialValue?: string;
  onFocus?(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
  onBlur?(e: NativeSyntheticEvent<TargetedEvent>): void;
  onSubmitEditing?(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>): void;
  textInputStyle?: TextStyle;
  textInputProps?: TextInputProps;
}

type State = {
  value?: string;
  error: React.ReactNode | void;
};

export class InputComponent extends React.PureComponent<Props, State> {
  private textInput?: TextInput;

  static defaultProps: DefaultProps = {
    secureTextEntry: false,
    keyboardType: "default",
    width: "100%",
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
    const { width, styles } = this.props;
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
          color={this.props.colors.defaultText}
          initialValue={this.props.initialValue}
        />
        <Text style={styles.error}>{this.state.error}</Text>
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
      return this.props.colors.palette.lightGray;
    }
    if (this.state.error) {
      return this.props.colors.error;
    }
    return this.props.colors.defaultText;
  };

  private getFieldColor = () => {
    if (!this.state.value) {
      return this.props.colors.palette.lightGray;
    }
    if (this.state.error) {
      return this.props.colors.error;
    }
    return this.props.colors.themeColor;
  };
}

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

export default withTheme<Props, DefaultProps>(getStyle)(InputComponent);
