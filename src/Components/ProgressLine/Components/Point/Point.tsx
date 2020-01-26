import * as React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "src/Themes/Colors";

type Props = {
  currentProgress?: number;
  isHollowPoint?: boolean;
};

export default class Point extends React.PureComponent<Props> {
  render() {
    const { currentProgress, isHollowPoint } = this.props;
    const pointColor = currentProgress ? Colors.themeColor : Colors.disable;
    const pointStyles = isHollowPoint
      ? [styles.hollowPointContainer, { borderColor: pointColor }]
      : [styles.pointContainer, { backgroundColor: pointColor }];
    return <View style={pointStyles} />;
  }
}

const styles = StyleSheet.create({
  pointContainer: {
    width: 7,
    height: 7,
    borderRadius: 7,
  },
  hollowPointContainer: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.background,
    borderWidth: 2,
  },
});
