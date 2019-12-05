import * as React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "src/Themes/Colors";

type Props = {
  currentProgress?: number;
};

class Point extends React.PureComponent<Props> {
  render() {
    const { currentProgress } = this.props;
    return <View style={[styles.point, { backgroundColor: currentProgress ? Colors.themeColor : Colors.disable }]} />;
  }
}

export default Point;

const styles = StyleSheet.create({
  point: {
    width: 7,
    height: 7,
    borderRadius: 7,
  },
});
