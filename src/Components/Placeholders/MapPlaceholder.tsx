import * as React from "react";
import { StyleSheet, View } from "react-native";
import MapPlaceholderIcon from "../Icons/MapPlaceholderIcon";
import Colors from "../../Themes/Colors";
import Paragraph from "./Paragraph";

interface IProps {
  lines: number;
}

class MapPlaceholder extends React.PureComponent<IProps> {
  public static defaultProps = {
    lines: 5,
  };
  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.mapIconContainer}>
          <MapPlaceholderIcon color={Colors.defaultText} width={150} height={150} />
        </View>
        <Paragraph lines={this.props.lines} />
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
