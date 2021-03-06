import * as React from "react";

import { View, StyleSheet, KeyboardType, TextInput, ActivityIndicator } from "react-native";
import Input from "src/Components/Input/Input";
import { GradientButton } from "src/Components/Buttons";
import withTheme, { ThemeProps } from "src/Themes/withTheme";

type FieldValue = { value?: string; isValid: boolean };
type FieldsState = { [key: string]: FieldValue };

type Field = {
  label: string;
  initialValue?: string;
  validate?(value?: string, fieldsState?: FieldsState): React.ReactNode;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardType;
  isRequired?: boolean;
};

interface DefaultProps {
  paddingTop: string | number;
  paddingHorizontal: string | number;
}

interface Props extends DefaultProps, ThemeProps {
  handleSubmit(res: FieldsState): void;
  fields: { [key: string]: Field };
  submitLabel: string;
  isLoading?: boolean;
  children?: React.ReactChild;
}

interface State {
  fields: FieldsState;
}

export class PureFormContainer extends React.PureComponent<Props, State> {
  nextInput: { [key: string]: TextInput } = {};
  inputs: React.ReactNode[];
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

    this.inputs = this.renderInputs();
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
        <View style={styles.inputContainer}>{this.inputs}</View>
        {this.props.children}
        <View style={styles.buttonsContainer}>
          {this.props.isLoading ? (
            <ActivityIndicator color={this.props.colors.themeColor} />
          ) : (
            <GradientButton
              disabled={!this.isFormValid()}
              label={this.props.submitLabel.toUpperCase()}
              onPress={this.handleSubmit}
            />
          )}
        </View>
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
          isRequired={field.isRequired}
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
    if (!field.validate) return;
    const preValidateFieldsState = {
      ...this.state.fields,
      [fieldName]: { value, isValid: false },
    };
    return field.validate(value, preValidateFieldsState);
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

export default withTheme<Props, DefaultProps>()(PureFormContainer);
