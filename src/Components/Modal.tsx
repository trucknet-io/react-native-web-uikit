import * as React from "react";
import { View } from "react-native";
import Subscriber, { modalPropertiesType } from "src/Subscriber";

interface ModalProps extends modalPropertiesType {
  component: React.ReactNode;
  isModalOpen: boolean;
}

class Modal extends React.PureComponent<ModalProps> {
  componentDidMount = () => {
    if (this.props.isModalOpen) {
      setTimeout(this.showModal, 500);
    }
  };
  componentWillReceiveProps = (nextProps: ModalProps) => {
    if (!nextProps.isModalOpen) return this.hideAllModals();
    if (nextProps.isModalOpen) {
      return this.showModal();
    }
  };
  render() {
    return <View />;
  }

  showModal = () => {
    Subscriber.showModal(this.props.component, {
      id: this.props.id,
      containerStyles: this.props.containerStyles,
      shadow: this.props.shadow,
      dontShowBackdrop: this.props.dontShowBackdrop,
      verticalDirection: this.props.verticalDirection,
      onBackdropPress: this.props.onBackdropPress,
      initialPosition: this.props.initialPosition,
    });
  };

  hideAllModals = () => {
    Subscriber.hideModal();
  };
}

export default Modal;
