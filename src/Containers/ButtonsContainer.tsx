import * as React from "react";
import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import * as Buttons from "../Components/Buttons";
import Colors from "../Themes/Colors";

interface State {
  [key: string]: string;
}

class ButtonsContainer extends React.PureComponent<{}, State> {
  public state: State = {
    width: "100%",
    height: "44",
    borderWidth: "0",
    borderRadius: "0",
    borderColor: Colors.gray,
    textColor: Colors.buttonText,
    disabled: "false",
    gradientStartColor: Colors.blueGreenGradient.gradientColor1,
    gradientEndColor: Colors.blueGreenGradient.gradientColor2,
  };
  private GUB_BETWEEN_BUTTONS = 10;
  public render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderCustomizationInputs()}
        <Buttons.GradientButton
          {...this.getCommonProps()}
          label="Gradient Button"
          textColor={this.state.textColor}
          gradientStartColor={this.parseColor(this.state.gradientStartColor)}
          gradientEndColor={this.parseColor(this.state.gradientEndColor)}
        />
        <Buttons.GradientButtonWithChildren
          {...this.getCommonProps()}
          gradientStartColor={this.parseColor(this.state.gradientStartColor)}
          gradientEndColor={this.parseColor(this.state.gradientEndColor)}>
          <View style={styles.buttonChildContainer}>
            <Text style={{ color: Colors.buttonText }}>With Children</Text>
            <ActivityIndicator size="large" color={Colors.buttonText} style={{ marginLeft: 10 }} />
          </View>
        </Buttons.GradientButtonWithChildren>
        <Buttons.TransparentButton
          {...this.getCommonProps()}
          label="Transparent Button"
          textColor={Colors.defaultText}
        />
        <Buttons.TransparentButtonWithLink
          {...this.getCommonProps()}
          label="Transparent Button With "
          link="Link"
          textColor={Colors.defaultText}
          linkColor={Colors.linkBlue}
        />
        <Buttons.TransparentButtonWithChildren
          {...this.getCommonProps()}
          label="Transparent Button"
          textColor={Colors.defaultText}>
          <View style={styles.buttonChildContainer}>
            <Text style={{ color: Colors.defaultText }}>Transparent Button With Children</Text>
            <ActivityIndicator size="large" color={Colors.lime} style={{ marginHorizontal: 10 }} />
          </View>
        </Buttons.TransparentButtonWithChildren>
      </ScrollView>
    );
  }

  private getCommonProps = () => ({
    onPress: this.showDialog,
    width: this.parseStringToNumberOrPercents(this.state.width),
    height: this.parseStringToNumberOrPercents(this.state.height),
    borderWidth: this.parseStringToNumber(this.state.borderWidth),
    borderColor: this.state.borderColor,
    borderRadius: this.parseStringToNumber(this.state.borderRadius),
    disabled: this.state.disabled === "true" ? true : false,
    marginVertical: this.GUB_BETWEEN_BUTTONS,
  });

  private showDialog = () => {};

  private parseStringToNumber = (value: string): number => {
    return parseInt(value);
  };

  private parseStringToNumberOrPercents = (value: string): number | string => {
    if (value.includes("%")) {
      return value;
    }
    return parseInt(value);
  };
  private parseColor = (value: string) => {
    if (Platform.OS === "web") {
      return value;
    }

    const isCorrectHexColor = /^#[0-9A-F]{6}$/i.test(value);
    if (isCorrectHexColor) {
      return value;
    }
    return "#fff";
  };
  private renderInput = (field: string) => {
    const value = this.state[field];
    return (
      <View style={styles.inputContainer}>
        <Text>{`${field}: `}</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder={value}
          value={value}
          onChangeText={(value) => this.setState({ [field]: value })}
        />
      </View>
    );
  };
  private renderCustomizationInputs = () => (
    <View style={styles.inputsContainer}>
      {this.renderInput("width")}
      {this.renderInput("height")}
      {this.renderInput("borderRadius")}
      {this.renderInput("borderWidth")}
      {this.renderInput("borderColor")}
      {this.renderInput("gradientStartColor")}
      {this.renderInput("gradientEndColor")}
      {this.renderInput("textColor")}
      {this.renderInput("disabled")}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
  buttonChildContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputsContainer: {
    backgroundColor: Colors.veryVeryLightGray,
    borderRadius: 4,
    padding: 10,
    margin: 10,
    width: 500,
  },
});

export default ButtonsContainer;
