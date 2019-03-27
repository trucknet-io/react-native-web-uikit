import * as React from "react";
import { View } from "react-native";
import Subscriber, { modalPropertiesType } from "../Subscriber";

interface ModalProps extends modalPropertiesType {
  component: React.ReactNode;
  isModalOpen?: boolean;
}

class Modal extends React.PureComponent<ModalProps> {
  componentDidMount = () => {
    if (this.props.isModalOpen !== false) {
      setTimeout(this.showModal, 500);
    }
  };
  componentWillReceiveProps = (nextProps: ModalProps) => {
    if (!nextProps.isModalOpen && nextProps.isModalOpen !== this.props.isModalOpen) return this.hideModal();
    return this.showModal();
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

  hideModal = () => {
    Subscriber.hideModal(this.props.id);
  };
}

export default Modal;
