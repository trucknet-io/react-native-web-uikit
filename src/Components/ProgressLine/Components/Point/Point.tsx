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
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: pointColor,
  };
  const hollowPointContainer = {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.containerBackground,
    borderWidth: 2,
    borderColor: pointColor,
  };
  return StyleSheet.create({
    pointStyles: isHollowPoint ? hollowPointContainer : pointContainer,
  });
};
export default withTheme<Props>(getStyles)(Point);
