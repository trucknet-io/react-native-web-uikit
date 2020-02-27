import * as React from "react";
import { View, StyleSheet } from "react-native";

import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Style = ReturnType<typeof getStyles>;

interface OwnProps {
  currentProgress?: number;
  isHollowPoint?: boolean;
}

interface Props extends OwnProps, ThemeProps<Style> {}

class Point extends React.PureComponent<Props> {
  render() {
    const { styles } = this.props;
    return <View style={styles.pointStyles} />;
  }
}

const getStyles = ({ colors, props: { currentProgress, isHollowPoint } }: ThemeParamsType<OwnProps>) => {
  const pointColor = currentProgress ? colors.themeColor : colors.disable;
  const pointContainer = {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: pointColor,
  };
  const hollowPointContainer = {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.containerBackground,
    borderWidth: 3,
    borderColor: pointColor,
  };
  return StyleSheet.create({
    pointStyles: isHollowPoint ? hollowPointContainer : pointContainer,
  });
};
export default withTheme<Props>(getStyles)(Point);
