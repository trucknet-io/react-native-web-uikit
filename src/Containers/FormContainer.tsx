import * as React from "react";

import { View, StyleSheet, KeyboardType } from "react-native";
import { colorTheme } from "../Themes/Colors";
import Input from "../Components/Input";
import { GradientButton } from "../Components/Buttons";

type FieldsState = { [key: string]: { value?: string; isValid: boolean } };

interface Props {
  onSubmit(res: FieldsState): void;
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
  theme: "light" | "dark";
  paddingTop: string | number;
  paddingHorizontal: string | number;
}

interface State {
  fields: FieldsState;
  colors: typeof colorTheme;
}

class LoginFormContainer extends React.PureComponent<Props, State> {
  static defaultProps = {
    paddingTop: 32,
    paddingHorizontal: "16%",
  };
  public setFields = () => {
    const fields: FieldsState = {};
    for (const fieldName in this.props.fields) {
      const field = this.props.fields[fieldName];
      fields[fieldName] = {
        value: field.initialValue,
        isValid: field.validate ? !field.validate(field.initialValue) : true,
      };
    }
    return fields;
  };
  state = {
    fields: this.setFields(),
    colors: colorTheme,
  };

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
    const fieldNamesLength = fieldNames.length;

    return fieldNames.map((fieldName, index) => {
      const field = this.props.fields[fieldName];
      let nextComponentName: string | undefined = fieldNames[index + 1];
      if (index === fieldNamesLength - 1) {
        nextComponentName = undefined;
      }
      return (
        <Input
          ref={(el) => (this[fieldName] = el)}
          key={fieldName}
          label={field.label}
          secureTextEntry={field.secureTextEntry}
          validateValue={field.validate}
          onChange={this.setValue(fieldName)}
          onSuccessInputFieldColor={theme.themeColor}
          textColor={theme.defaultText}
          keyboardType={field.keyboardType}
          initialValue={field.initialValue}
          onSubmitEditing={this.onCurrentInputSubmit(nextComponentName)}
        />
      );
    });
  };

  private onCurrentInputSubmit = (nextComponentName?: string) => () => {
    if (nextComponentName) {
      return this[nextComponentName].focus();
    }
    if (!nextComponentName && this.isFieldsValid()) {
      return this.onSubmit();
    }
  };

  private setValue = (fieldName: string) => (value) => {
    this.setState({ fields: { ...this.state.fields, [fieldName]: value } });
  };
  private onSubmit = () => {
    this.props.onSubmit(this.state.fields);
  };
  private renderSubmitButton = () => {
    return (
      <GradientButton
        disabled={!this.isFieldsValid()}
        height={40}
        label={this.props.submitLabel.toUpperCase()}
        onPress={this.onSubmit}
      />
    );
  };

  private isFieldsValid = () => {
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
