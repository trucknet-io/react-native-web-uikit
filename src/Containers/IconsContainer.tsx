import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import * as Icons from "../Components/Icons";
import Colors from "../Themes/Colors";

class IconsContainer extends React.PureComponent {
  public render() {
    return (
      <ScrollView>
        <View style={styles.container}>{this.renderIcons()}</View>
      </ScrollView>
    );
  }

  private renderIcons = () => {
    const IconsNames = Object.keys(Icons);
    return IconsNames.map((name: string) => {
      // @ts-ignore
      const Icon = Icons[name];
      return (
        <View style={styles.iconContainer}>
          <Text>{name}</Text>
          <Icon color={Colors.themeDark} />
        </View>
      );
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
    backgroundColor: Colors.background,
  },
  iconContainer: {
    padding: "4%",
    alignItems: "center",
    justifyContent: "space-between",
    height: 200,
    width: 150,
  },
});

export default IconsContainer;
