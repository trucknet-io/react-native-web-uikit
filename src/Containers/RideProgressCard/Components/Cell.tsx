import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "src/Themes/Colors";
import Fonts from "src/Themes/Fonts";

type Props = {
  mainText: string;
  secondaryText?: string;
};

class Cell extends React.PureComponent<Props> {
  public render() {
    const { secondaryText, mainText } = this.props;
    return (
      <View>
        <Text style={styles.mainText}>{mainText}</Text>
        <Text style={styles.secondaryText}>{secondaryText}</Text>
      </View>
    );
  }
}

export default Cell;

const styles = StyleSheet.create({
  mainText: {
    color: Colors.defaultText,
    ...Fonts.style.description,
  },
  secondaryText: {
    color: Colors.secondaryText,
    ...Fonts.style.small,
  },
});
