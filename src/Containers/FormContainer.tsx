import * as React from "react";

import { View, StyleSheet, KeyboardType, TextInput } from "react-native";
import { colorTheme } from "src/Themes/Colors";
import Input from "src/Components/Input";
import { GradientButton } from "src/Components/Buttons";

type FieldsState = { [key: string]: { value?: string; isValid: boolean } };

interface Props {
  handleSubmit(res: FieldsState): void;
  fields: {
    [key: string]: {
      label: string;
      initialValue?: string;
      validate?(value?: string): string | void | undefined;
      secureTextEntry?: boolean;
      keyboardType?: KeyboardType;
    };
  };
  submitLabel: string;
  theme: "light" | "dark";
  paddingTop: string | number;
  paddingHorizontal: string | number;
}

interface State {
  fields: FieldsState;
  colors: typeof colorTheme;
}

class LoginFormContainer extends React.PureComponent<Props, State> {
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
    const theme = this.state.colors[this.props.theme];
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.background,
            paddingTop: this.props.paddingTop,
            paddingHorizontal: this.props.paddingHorizontal,
          },
        ]}>
        <View style={styles.inputContainer}>{this.renderInputs()}</View>
        <View style={styles.buttonsContainer}>{this.renderSubmitButton()}</View>
      </View>
    );
  }

  private renderInputs = () => {
    const theme = this.state.colors[this.props.theme];
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
          onChangeTextValidated={this.setValue(fieldName)}
          onSuccessInputFieldColor={theme.themeColor}
          textColor={theme.defaultText}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  buttonsContainer: { flex: 1, width: "100%", justifyContent: "space-around" },
});

export default LoginFormContainer;
