import * as React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Style = ReturnType<typeof getStyle>;

interface DefaultProps {
  size: number;
  hollowSize: number;
}

interface OwnProps extends DefaultProps {
  color?: string;
  style?: ViewStyle;
}

interface Props extends OwnProps, ThemeProps<Style> {}

export class PurePoint extends React.PureComponent<Props> {
  public static defaultProps = {
    size: 8,
    hollowSize: 0,
  };
  public render() {
    const { styles } = this.props;
    return <View style={[styles.container, this.props.style]} />;
  }
}

const getStyle = ({ props: { size, color, hollowSize } }: ThemeParamsType<OwnProps>) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      marginHorizontal: 2,
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: size / 2 - hollowSize / 2,
      borderColor: color,
    },
  });

export default withTheme<Props, DefaultProps>(getStyle)(PurePoint);
