import * as React from "react";
import { View, Platform } from "react-native";
import Gradient from "../Components/LinearGradient";
import Input from "../Components/Inputs/Input";
import CodeView from "../Components/CodeView";
import Colors from "../Themes/Colors";
import { isCorrectHexColor } from "../Helpers/colors";

type State = {
  startX: string;
  startY: string;
  endX: string;
  endY: string;
  gradientStartColor: string;
  gradientEndColor: string;
};

class GradientContainer extends React.PureComponent<{}, State> {
  public state: State = {
    startX: "0",
    startY: "1",
    endX: "1",
    endY: "1",
    gradientStartColor: Colors.ashGradient.gradientColor1,
    gradientEndColor: Colors.ashGradient.gradientColor2,
  };

  public render() {
    const { startX, startY, endX, endY, gradientStartColor, gradientEndColor } = this.state;
    return (
      <Gradient
        gradientStartColor={this.parseColor(gradientStartColor)}
        gradientEndColor={this.parseColor(gradientEndColor)}
        start={{ x: this.parseCoords(startX), y: this.parseCoords(startY) }}
        end={{ x: this.parseCoords(endX), y: this.parseCoords(endY) }}>
        <CodeView width={400}>
          <View>
            <Input
              value={gradientStartColor}
              field={"gradientStartColor"}
              onChangeText={this.onChangeText("gradientStartColor")}
            />
            <Input
              value={gradientEndColor}
              field={"gradientEndColor"}
              onChangeText={this.onChangeText("gradientEndColor")}
            />
            <Input value={startX} field={"start position X"} onChangeText={this.onChangeText("startX")} />
            <Input value={startY} field={"start position Y"} onChangeText={this.onChangeText("startY")} />
            <Input value={endX} field={"end position X"} onChangeText={this.onChangeText("endX")} />
            <Input value={endY} field={"end position Y"} onChangeText={this.onChangeText("endY")} />
          </View>
        </CodeView>
      </Gradient>
    );
  }

  private parseCoords = (position: string): number => {
    if (position && position.length > 0) return parseInt(position);
    return 0;
  };

  private parseColor = (color: string) => {
    if (Platform.OS === "web") {
      return color;
    }

    if (isCorrectHexColor(color)) {
      return color;
    }
    return "#fff";
  };

  private onChangeText = (field: string) => (value: string) => {
    // @ts-ignore
    this.setState({ [field]: value });
  };
}

export default GradientContainer;
