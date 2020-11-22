import * as React from "react";
import Point from "src/Components/Point";
import Colors from "src/Themes/Colors";

interface Props {
  isArrivedTo?: boolean;
  isHollowPoint?: boolean;
}

class ProgressPoint extends React.PureComponent<Props> {
  render() {
    const { isArrivedTo, isHollowPoint } = this.props;
    const color = isArrivedTo ? Colors.themeColor : Colors.disable;
    return <Point color={color} hollowSize={isHollowPoint ? 4 : 0} />;
  }
}

export default ProgressPoint;
