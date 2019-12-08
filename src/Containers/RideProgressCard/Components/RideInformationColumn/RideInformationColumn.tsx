import * as React from "react";
import { View, ViewStyle, Text, StyleSheet } from "react-native";
import Colors from "src/Themes/Colors";
import Fonts from "src/Themes/Fonts";

type Props = {
  styles: ViewStyle;
  firstBlockTitle: string;
  firstBlockText?: string;
  secondBlockTitle: string;
  secondBlockText?: string;
};

class RideInfoColumn extends React.PureComponent<Props> {
  render() {
    const { firstBlockTitle, firstBlockText, secondBlockTitle, secondBlockText } = this.props;
    return (
      <View style={this.props.styles}>
        <View>
          <Text style={styles.mainText}>{firstBlockTitle}</Text>
          <Text style={styles.secondaryText}>{firstBlockText}</Text>
        </View>
        <View>
          <Text style={styles.mainText}>{secondBlockTitle}</Text>
          <Text style={styles.secondaryText}>{secondBlockText}</Text>
        </View>
      </View>
    );
  }
}

export default RideInfoColumn;

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
