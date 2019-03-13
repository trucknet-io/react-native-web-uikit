import * as React from "react";
import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import * as Buttons from "../Components/Buttons";
import Input from "../Components/Input";
import CodeView from "../Components/CodeView";
import Colors from "../Themes/Colors";
import { isCorrectHexColor } from "../Helpers/colors";

type State = {
  [key: string]: string;
};

class ButtonsContainer extends React.PureComponent<{}, State> {
  public state: State = {
    width: "100%",
    height: "44",
    borderWidth: "0",
    borderRadius: "0",
    borderColor: Colors.gray,
    textColor: Colors.buttonText,
    disabled: "false",
    gradientStartColor: Colors.themeGradient.gradientColor1,
    gradientEndColor: Colors.themeGradient.gradientColor2,
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
          linkColor={Colors.themeDark}
        />
        <Buttons.TransparentButtonWithChildren
          {...this.getCommonProps()}
          label="Transparent Button"
          textColor={Colors.defaultText}>
          <View style={styles.buttonChildContainer}>
            <Text style={{ color: Colors.defaultText }}>Transparent Button With Children</Text>
            <ActivityIndicator size="large" color={Colors.themeDark} style={{ marginHorizontal: 10 }} />
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

    if (isCorrectHexColor(value)) {
      return value;
    }
    return "#fff";
  };

  private onChangeText = (field: string) => (value: string) => this.setState({ [field]: value });

  private renderCustomizationInputs = () => (
    <CodeView width={500}>
      <View>
        <Input value={this.state.width} field={"width"} onChangeText={this.onChangeText("width")} />
        <Input value={this.state.height} field={"height"} onChangeText={this.onChangeText("height")} />
        <Input
          value={this.state.borderRadius}
          field={"borderRadius"}
          onChangeText={this.onChangeText("borderRadius")}
        />
        <Input value={this.state.borderWidth} field={"borderWidth"} onChangeText={this.onChangeText("borderWidth")} />
        <Input value={this.state.borderColor} field={"borderColor"} onChangeText={this.onChangeText("borderColor")} />
        <Input
          value={this.state.gradientStartColor}
          field={"gradientStartColor"}
          onChangeText={this.onChangeText("gradientStartColor")}
        />
        <Input
          value={this.state.gradientEndColor}
          field={"gradientEndColor"}
          onChangeText={this.onChangeText("gradientEndColor")}
        />
        <Input value={this.state.textColor} field={"textColor"} onChangeText={this.onChangeText("textColor")} />
        <Input value={this.state.disabled} field={"disabled"} onChangeText={this.onChangeText("disabled")} />
      </View>
    </CodeView>
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
});

export default ButtonsContainer;
