import * as React from "react";
import Modal, { ModalProps } from "react-native-modal";
import { isWeb } from "src/Helpers/platform";
import WebModal from "./WebModal";

export class HybridModalComponent extends React.PureComponent<ModalProps> {
  public render() {
    if (!this.props.isVisible) return null;

    if (!isWeb) {
      return <Modal {...this.props}>{this.props.children}</Modal>;
    }

    return <WebModal {...this.props} />;
  }
}

export default HybridModalComponent;
