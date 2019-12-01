import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import * as Icons from "src/Components/Icons";
import Colors from "src/Themes/Colors";

type IconProps = {
  width?: number;
  height?: number;
  color: string;
};

class IconName extends React.PureComponent<IconProps> {
  public static defaultProps = {
    color: Colors.icon,
  };
  public render() {
    return (
      <ScrollView>
        <View style={styles.container}>{this.renderIcons()}</View>
      </ScrollView>
    );
  }

  private renderIcons = () => {
    const IconsNames = Object.keys(Icons);
    return IconsNames.map((name: string, i: number) => {
      // @ts-ignore
      const Icon = Icons[name];
      return (
        <View style={styles.iconContainer} key={i}>
          <Text>{name}</Text>
          <Icon color={this.props.color} width={this.props.width} height={this.props.height} />
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

export default IconName;
