import React from "react";
import withTheme from "src/Themes/withTheme";

type Props = {
  switchTheme: () => void;
  withSwitchTheme: boolean;
};

class StoryWrapper extends React.PureComponent<Props> {
  render() {
    const Story = this.props.children as React.ComponentClass<{ switchTheme: () => void }>;
    return <Story switchTheme={this.props.switchTheme} />;
  }
}

export default withTheme<Props, undefined>()(StoryWrapper);
