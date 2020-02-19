import * as React from "react";

import { View, StyleSheet, KeyboardType, TextInput } from "react-native";
import Input from "src/Components/Input/Input";
import { GradientButton } from "src/Components/Buttons";
import withTheme, { ThemeProps } from "src/Themes/withTheme";

type FieldValue = { value?: string; isValid: boolean };
type FieldsState = { [key: string]: FieldValue };

type Field = {
  label: string;
  initialValue?: string;
  validate?(value?: string, fieldsState?: FieldsState): string | void | undefined;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardType;
};

interface DefaultProps {
  paddingTop: string | number;
  paddingHorizontal: string | number;
}

interface Props extends DefaultProps, ThemeProps {
  handleSubmit(res: FieldsState): void;
  fields: { [key: string]: Field };
  submitLabel: string;
}

interface State {
  fields: FieldsState;
}

export class FormContainerComponent extends React.PureComponent<Props, State> {
  nextInput: { [key: string]: TextInput } = {};
  static defaultProps: DefaultProps = {
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
    };
  }

  public render() {
    const { colors } = this.props;
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.containerBackground,
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
          validateValue={this.validateValue(fieldName)}
          onChangeTextValidated={this.setValue(fieldName)}
          keyboardType={field.keyboardType}
          initialValue={field.initialValue}
          onSubmitEditing={this.handleInputSubmit(nextInputName)}
        />
      );
    });
  };
  private validateValue = (fieldName: string) => (value?: string) => {
    const field = this.props.fields[fieldName];
    if (field.validate) {
      const preValidateFieldsState = {
        ...this.state.fields,
        [fieldName]: { value, isValid: false },
      };
      return field.validate(value, preValidateFieldsState);
    }
  };
  private setValue = (fieldName: string) => (value: FieldValue) => {
    this.setState({ fields: { ...this.state.fields, [fieldName]: value } });
  };

  private setFieldRef = (fieldName) => (field) => (this.nextInput[fieldName] = field);

  private handleInputSubmit = (nextInputName?: string) => () => {
    if (nextInputName && this.nextInput[nextInputName]) {
      const textInput = this.nextInput[nextInputName] as TextInput;
      return textInput.focus();
    }
    if (!nextInputName && this.isFormValid()) {
      return this.handleSubmit();
    }
  };

  private handleSubmit = () => {
    this.props.handleSubmit(this.state.fields);
  };
  private renderSubmitButton = () => {
    return (
      <GradientButton
        disabled={!this.isFormValid()}
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

export default withTheme<Props, DefaultProps>()(FormContainerComponent);
