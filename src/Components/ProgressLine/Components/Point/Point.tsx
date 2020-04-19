import * as React from "react";
import Point from "src/Components/Point";
import Colors from "src/Themes/Colors";

interface Props {
  currentProgress?: number;
  isHollowPoint?: boolean;
}

class ProgressPoint extends React.PureComponent<Props> {
  render() {
    const { currentProgress, isHollowPoint } = this.props;
    const color = currentProgress ? Colors.themeColor : Colors.disable;
    return <Point color={color} hollowSize={isHollowPoint ? 4 : 0} />;
  }
}

export default ProgressPoint;
