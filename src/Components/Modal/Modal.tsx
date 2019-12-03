import * as React from "react";
import Modal, { ModalProps } from "react-native-modal";
import { isWeb } from "src/Helpers/platform";
import WebModal from "./WebModal";

const HybridModal = (props: ModalProps) => {
  if (!props.isVisible) return null;

  if (!isWeb) {
    return <Modal {...props}>{props.children}</Modal>;
  }

  return <WebModal {...props} />;
};

export default React.memo(HybridModal);
