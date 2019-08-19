import * as React from "react";
import { StyleSheet, View } from "react-native";
import MapPlaceholderIcon from "../Icons/MapPlaceholderIcon";
import Paragraph from "./Paragraph";
import { colorTheme } from "../../Themes/Colors";

interface Props {
  lines: number;
  theme: "light" | "dark";
}

interface State {
  colors: typeof colorTheme;
}

class MapPlaceholder extends React.PureComponent<Props, State> {
  state = {
    colors: colorTheme,
  };
  public static defaultProps = {
    lines: 5,
    theme: "light",
  };
  public render() {
    const theme = this.state.colors[this.props.theme];
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.mapIconContainer}>
          <MapPlaceholderIcon color={theme.defaultText} width={150} height={150} />
        </View>
        <Paragraph lines={this.props.lines} theme={this.props.theme} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  mapIconContainer: {
    flex: 1,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MapPlaceholder;
