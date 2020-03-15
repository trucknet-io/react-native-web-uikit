import * as React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import withTheme, { ThemeProps } from "src/Themes/withTheme";

type Style = ReturnType<typeof getStyles>;

interface Props extends ThemeProps<Style> {
  style?: ViewStyle;
  children: React.ReactNode;
}

export class PureRideInfo extends React.Component<Props> {
  public render() {
    const { styles } = this.props;
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.propertiesRawContainer}>{this.props.children}</View>
      </View>
    );
  }
}

const getStyles = () =>
  StyleSheet.create({
    container: {
      justifyContent: "space-around",
      flexGrow: 1,
    },

    propertiesRawContainer: {
      flexGrow: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
  });

export default withTheme<Props>(getStyles)(PureRideInfo);
