import * as React from "react";
import Point from "src/Components/Point";
import Colors from "src/Themes/Colors";

type Props = {
  currentProgress?: number;
};

class ProgressPoint extends React.PureComponent<Props> {
  render() {
    const { currentProgress } = this.props;
    const color = currentProgress ? Colors.themeColor : Colors.disable;
    return <Point color={color} />;
  }
}

export default ProgressPoint;
