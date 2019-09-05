import * as React from "react";

import { View, StyleSheet, KeyboardType, TextInput } from "react-native";
import { colorTheme, ColorType } from "../Themes/Colors";
import Input from "../Components/Input";
import { GradientButton } from "../Components/Buttons";
import withTheme, { SetStyleParamsType, ThemeProps } from "../Themes/withTheme";

type FieldsState = { [key: string]: { value?: string; isValid: boolean } };

type Style = ReturnType<typeof setStyle>;

interface Props extends ThemeProps<Style> {
  handleSubmit(res: FieldsState): void;
  fields: {
    [key: string]: {
      label: string;
      initialValue?: string;
      validate?(value?: string): string | undefined;
      secureTextEntry?: boolean;
      keyboardType?: KeyboardType;
    };
  };
  submitLabel: string;
  paddingTop?: string | number;
  paddingHorizontal?: string | number;
  style: Style;
  color: ColorType;
}

interface State {
  fields: FieldsState;
  colors: typeof colorTheme;
}

class FormContainer extends React.PureComponent<Props, State> {
  nextInput: { [key: string]: TextInput } = {};
  static defaultProps = {
    paddingTop: 32,
    paddingHorizontal: "16%",
  };

  public constructor(props) {
    super(props);
    const fields: FieldsState = {};
    for (const fieldName in this.props.fields) {
      const field = this.props.fields[fieldName];
      fields[fieldName] = {
        value: field.initialValue,
        isValid: field.validate ? !field.validate(field.initialValue) : true,
      };
    }

    this.state = {
      fields: fields,
      colors: colorTheme,
    };
  }

  public render() {
    const { style } = this.props;
    return (
      <View
        style={[
          style.container,
          {
            paddingTop: this.props.paddingTop,
            paddingHorizontal: this.props.paddingHorizontal,
          },
        ]}>
        <View style={style.inputContainer}>{this.renderInputs()}</View>
        <View style={style.buttonsContainer}>{this.renderSubmitButton()}</View>
      </View>
    );
  }

  private renderInputs = () => {
    const { color } = this.props;
    const fieldNames = Object.keys(this.props.fields);

    return fieldNames.map((fieldName, index) => {
      const field = this.props.fields[fieldName];
      const nextInputName = fieldNames[index + 1];
      return (
        <Input
          ref={this.setFieldRef(fieldName)}
          key={fieldName}
          label={field.label}
          secureTextEntry={field.secureTextEntry}
          validateValue={field.validate}
          onChange={this.setValue(fieldName)}
          onSuccessInputFieldColor={color.themeColor}
          textColor={color.defaultText}
          keyboardType={field.keyboardType}
          initialValue={field.initialValue}
          onSubmitEditing={this.onCurrentInputSubmit(nextInputName)}
        />
      );
    });
  };

  private setFieldRef = (fieldName) => (field) => (this.nextInput[fieldName] = field);

  private onCurrentInputSubmit = (nextInputName?: string) => () => {
    if (nextInputName && this.nextInput[nextInputName]) {
      const textInput = this.nextInput[nextInputName] as TextInput;
      return textInput.focus();
    }
    if (!nextInputName && this.isFormValid()) {
      return this.handleSubmit();
    }
  };

  private setValue = (fieldName: string) => (value) => {
    this.setState({ fields: { ...this.state.fields, [fieldName]: value } });
  };
  private handleSubmit = () => {
    this.props.handleSubmit(this.state.fields);
  };
  private renderSubmitButton = () => {
    return (
      <GradientButton
        disabled={!this.isFormValid()}
        height={40}
        label={this.props.submitLabel.toUpperCase()}
        onPress={this.handleSubmit}
      />
    );
  };

  private isFormValid = () => {
    const fieldsValidStatus: boolean[] = [];
    for (const fieldName in this.state.fields) {
      const field = this.state.fields[fieldName];
      fieldsValidStatus.push(field.isValid);
    }

    return !fieldsValidStatus.includes(false);
  };
}

const setStyle = ({ color }: SetStyleParamsType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: color.background,
    },
    inputContainer: {
      flex: 1,
      width: "100%",
      flexDirection: "column",
      justifyContent: "flex-end",
    },
    buttonsContainer: { flex: 1, width: "100%", justifyContent: "space-around" },
  });
};

type DefaultProps = typeof FormContainer.defaultProps;

export default withTheme<Props, Style, DefaultProps>(setStyle)(FormContainer);
