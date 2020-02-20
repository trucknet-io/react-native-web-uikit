import * as React from "react";
import { StyleSheet, View } from "react-native";
// tslint:disable-next-line:import-name
import Shimmer from "react-native-shimmer-placeholder";
import { isWeb } from "src/Helpers/platform";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Styles = ReturnType<typeof getStyles>;

interface DefaultProps {
  lines: number;
}

interface Props extends DefaultProps, ThemeProps<Styles> {}

export class ParagraphPlaceholderComponent extends React.PureComponent<Props> {
  public static defaultProps: DefaultProps = {
    lines: 5,
  };
  public render() {
    return (
      <View style={this.props.styles.container}>
        {isWeb ? this.renderWebPlaceholder() : this.renderNativePlaceholderLines()}
      </View>
    );
  }

  private renderNativePlaceholderLines = () => {
    const placeholderLines: Array<React.ReactNode> = [];
    let i;
    for (i = 0; i < this.props.lines; i++) {
      placeholderLines.push(<Shimmer autoRun={true} style={this.props.styles.line} />);
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

const getStyles = ({ colors }: ThemeParamsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.containerBackground,
    },
    webContainer: {
      width: "90%",
    },
    line: {
      margin: 8,
    },
  });

let ParagraphPlaceholder = withTheme<Props, DefaultProps>(getStyles)(ParagraphPlaceholderComponent);

export { ParagraphPlaceholder };
