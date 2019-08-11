import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Hoshi } from "react-native-textinput-effects";
import Colors from "../Themes/Colors";

type Response = { value: string; isValid: boolean };

type Props = {
  label: string;
  setValue(Response): void;
  fieldColor: string;
  secureTextEntry: boolean;
  validateValue?(value: string): string | undefined;
  initialValue?: string;
};

type State = {
  value: string;
  error?: string;
};

class Field extends React.PureComponent<Props, State> {
  static defaultProps = {
    fieldColor: Colors.lime,
    secureTextEntry: false,
  };
  public state = {
    value: this.props.initialValue,
    error: undefined,
  };
  public render() {
    return (
      <View style={styles.container}>
        {this.renderInput()}
        <Text style={styles.error}>{this.state.error}</Text>
      </View>
    );
  }

  private renderInput = () => {
    const { label, secureTextEntry } = this.props;
    return (
      //@ts-ignore
      <Hoshi
        secureTextEntry={secureTextEntry}
        label={label}
        borderColor={this.setFieldColor()}
        value={this.state.value}
        onChangeText={this.onChangeText}
        inputPadding={8}
        borderHeight={1}
        labelStyle={{ fontSize: 14 }}
        inputStyle={{ paddingTop: 8, fontSize: 18, borderWidth: 0 }}
      />
    );
  };

  private setFieldColor = () => {
    if (this.state.error) {
      return Colors.error;
    }
    return this.props.fieldColor;
  };

  private onChangeText = (value) => {
    this.setState({ value }, this.validate);
  };

  private validate = () => {
    const { validateValue } = this.props;
    if (validateValue) {
      return this.setState({ error: validateValue(this.state.value) }, this.setValue);
    }

    return this.setValue;
  };

  private setValue = () => {
    this.props.setValue({ value: this.state.value, isValid: !this.state.error });
  };
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  error: {
    color: Colors.error,
    paddingHorizontal: 8,
  },
});

export default Field;
