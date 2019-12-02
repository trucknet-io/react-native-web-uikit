import * as React from "react";
import Modal, { ModalProps } from "react-native-modal";
import { isWeb } from "src/Helpers/platform";
import WebModal from "./WebModal";

let documentBody: HTMLBodyElement;
let domElement: HTMLDivElement;

if (isWeb) {
  documentBody = document.getElementsByTagName("body")[0];
  domElement = document.createElement("div");
}

const HybridModal = (props: ModalProps) => {
  if (!props.isVisible) return null;

  if (!isWeb) {
    return <Modal {...props}>{props.children}</Modal>;
  }

  return <WebModal {...props} documentBody={documentBody} domElement={domElement} />;
};

export default React.memo(HybridModal);
