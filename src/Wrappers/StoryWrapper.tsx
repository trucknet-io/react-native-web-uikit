import React from "react";

type Props = {};

class StoryWrapper extends React.PureComponent<Props> {
  render() {
    const Story = this.props.children as React.ComponentClass<Props>;
    return <Story />;
  }
}

export default StoryWrapper;
