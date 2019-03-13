import * as React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../Themes/Colors";
import createShadow from "../Themes/Shadow";

type Props = {
  width?: number | string;
  children: React.ReactChild;
};

class CodeView extends React.PureComponent<Props> {
  public render() {
    const { width } = this.props;

    return <View style={[styles.container, { width: width || "100%" }]}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.codeBackground,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 500,
    borderWidth: 1,
    borderColor: Colors.border,
    ...createShadow(2),
  },
});

export default CodeView;
