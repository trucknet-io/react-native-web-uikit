import * as React from "react";
import { StyleSheet, View } from "react-native";
import MapPlaceholderIcon from "src/Components/Icons/MapPlaceholderIcon";
import { ParagraphPlaceholder } from "./Paragraph";
import withTheme, { ThemeProps } from "src/Themes/withTheme";

interface DefaultProps {
  lines: number;
}

interface Props extends DefaultProps, ThemeProps {}

class Placeholder extends React.PureComponent<Props> {
  public static defaultProps: DefaultProps = {
    lines: 5,
  };
  public render() {
    return (
      <View style={[styles.container, { backgroundColor: this.props.colors.containerBackground }]}>
        <View style={styles.mapIconContainer}>
          <MapPlaceholderIcon color={this.props.colors.defaultText} width={150} height={150} />
        </View>
        <ParagraphPlaceholder lines={this.props.lines} />
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

let MapPlaceholder = withTheme<Props, DefaultProps>()(Placeholder);

export { MapPlaceholder };
