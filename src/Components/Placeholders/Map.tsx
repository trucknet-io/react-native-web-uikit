import * as React from "react";
import { StyleSheet, View } from "react-native";
import MapPlaceholderIcon from "src/Components/Icons/MapPlaceholderIcon";
import { ParagraphPlaceholder } from "./Paragraph";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Styles = ReturnType<typeof getStyles>;

interface DefaultProps {
  lines: number;
}

interface Props extends DefaultProps, ThemeProps<Styles> {}

export class MapPlaceholderComponent extends React.PureComponent<Props> {
  public static defaultProps: DefaultProps = {
    lines: 5,
  };
  public render() {
    return (
      <View style={this.props.styles.container}>
        <View style={this.props.styles.mapIconContainer}>
          <MapPlaceholderIcon color={this.props.colors.defaultText} width={150} height={150} />
        </View>
        <ParagraphPlaceholder lines={this.props.lines} />
      </View>
    );
  }
}
const getStyles = ({ colors }: ThemeParamsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-around",
      backgroundColor: colors.containerBackground,
    },
    mapIconContainer: {
      flex: 1,
      height: 300,
      alignItems: "center",
      justifyContent: "center",
    },
  });

let MapPlaceholder = withTheme<Props, DefaultProps>(getStyles)(MapPlaceholderComponent);

export { MapPlaceholder };
