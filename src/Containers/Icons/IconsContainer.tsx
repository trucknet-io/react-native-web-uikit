import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import * as Icons from "src/Components/Icons";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Styles = ReturnType<typeof getStyles>;

interface IconProps extends ThemeProps<Styles> {
  width?: number;
  height?: number;
}

class IconName extends React.PureComponent<IconProps> {
  public render() {
    return (
      <ScrollView>
        <View style={this.props.styles.container}>{this.renderIcons()}</View>
      </ScrollView>
    );
  }

  private renderIcons = () => {
    const IconsNames = Object.keys(Icons);
    return IconsNames.map((name: string, i: number) => {
      const Icon = Icons[name];
      return (
        <View style={this.props.styles.iconContainer} key={i}>
          <Text style={this.props.styles.text}>{name}</Text>
          <Icon color={this.props.colors.defaultText} width={this.props.width} height={this.props.height} />
        </View>
      );
    });
  };
}

const getStyles = ({ colors }: ThemeParamsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 40,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "stretch",
      backgroundColor: colors.containerBackground,
    },
    iconContainer: {
      padding: "4%",
      alignItems: "center",
      justifyContent: "space-between",
      height: 200,
      width: 150,
    },
    text: {
      color: colors.defaultText,
    },
  });

export default withTheme<IconProps>(getStyles)(IconName);
