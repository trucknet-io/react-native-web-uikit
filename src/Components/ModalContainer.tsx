import * as React from "react";
import { GatewayDest, GatewayProvider } from "react-gateway";

export default class ModalContainer extends React.PureComponent {
  public render() {
    return (
      <GatewayProvider>
        <GatewayDest name="global" />
        {this.props.children}
      </GatewayProvider>
    );
  }
}
