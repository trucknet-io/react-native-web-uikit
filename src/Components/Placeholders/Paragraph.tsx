import * as React from "react";
import { StyleSheet, View } from "react-native";
// tslint:disable-next-line:import-name
import Shimmer from "react-native-shimmer-placeholder";
import { isWeb } from "../../Helpers/platform";
import { colorTheme } from "../../Themes/Colors";

interface Props {
  lines: number;
  theme: "light" | "dark";
}

interface State {
  colors: typeof colorTheme;
}

class ParagraphPlaceholder extends React.PureComponent<Props, State> {
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
        {isWeb ? this.renderWebPlaceholder() : this.renderNativePlaceholderLines()}
      </View>
    );
  }

  private renderNativePlaceholderLines = () => {
    const placeholderLines: Array<React.ReactNode> = [];
    let i;
    for (i = 0; i < this.props.lines; i++) {
      placeholderLines.push(<Shimmer autoRun={true} style={styles.line} />);
    }
    return placeholderLines;
  };
  private renderWebPlaceholderLines = () => {
    const placeholderLines: Array<React.ReactNode> = [];
    let i;
    for (i = 0; i < this.props.lines; i++) {
      placeholderLines.push(<rect x="80" y={10 * i} rx="3" ry="3" width="250" height="6" />);
    }
    return placeholderLines;
  };
  private renderWebPlaceholder = () => {
    return <Shimmer>{this.renderWebPlaceholderLines()}</Shimmer>;
  };
}

export default ParagraphPlaceholder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  webContainer: {
    width: "90%",
  },
  line: {
    margin: 8,
  },
});
