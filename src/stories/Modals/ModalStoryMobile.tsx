import React from "react";
import { Button } from "react-native";
import { number, object } from "@storybook/addon-knobs/react";
import RootWrapper from "src/Wrappers/RootWrapper";
import Modal from "src/Components/Modal";
import ModalViewMobile from "./ModalViewMobile";

class ModalContainer extends React.PureComponent<{}> {
  state = {
    isModalOpen: false,
  };
  render() {
    const getModalStyles = () => {
      return { top: "20%", left: "-50%", height: "60%", width: "80%", borderRadius: 35 };
    };

    const id = number("id", 123321);
    const modalStyles = object("modalStyles", getModalStyles());
    const component = <ModalViewMobile buttonWidth={50} modalId={id} />;

    return (
      <RootWrapper
        styles={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Button title="show modal" onPress={this.showModal} />
        <Modal
          id={id}
          component={component}
          containerStyles={modalStyles}
          isModalOpen={this.state.isModalOpen}
          onBackdropPress={this.onBackdropPress}
        />
      </RootWrapper>
    );
  }

  showModal = () => this.setState({ isModalOpen: true });
  onBackdropPress = () => this.setState({ isModalOpen: false });
}

export default ModalContainer;
