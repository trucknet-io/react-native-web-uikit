import React from "react";
import { Dimensions, Button, View } from "react-native";
import { number, boolean, text, object } from "@storybook/addon-knobs/react";
import RootWrapper from "../../Wrappers/RootWrapper";
import Modal from "../../Components/Modal";
import ModalView from "./ModalView";

class ModalContainer extends React.PureComponent<{}> {
  state = {
    isModalOpen: false,
  };
  render() {
    const getModalStyles = (verticalDirection: boolean) => {
      if (verticalDirection) {
        return { top: "-50%", left: "20%", height: "100%", width: "60%", borderRadius: 35 };
      }

      return { top: "20%", left: "-40%", height: "60%", width: "60%", borderRadius: 35 };
    };

    const verticalDirection = boolean("verticalDirection", false);
    const id = number("id", 123321);
    const modalStyles = object("modalStyles", getModalStyles(verticalDirection));
    const shadow = number("shadow", 10);
    const initialPosition = text("initialModalPosition", "-100%");
    const dontShowBackdrop = boolean("dontShowBackdrop", false);
    const component = <ModalView buttonWidth={100} verticalDirection={verticalDirection} modalId={id} />;

    return (
      <RootWrapper
        styles={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          height: Dimensions.get("window").height,
        }}>
        <View style={{ margin: 20 }}>
          <Button title="toggle modal" onPress={this.toggleModal} />
        </View>
        <Modal
          id={id}
          component={component}
          containerStyles={modalStyles}
          shadow={shadow}
          dontShowBackdrop={dontShowBackdrop}
          verticalDirection={verticalDirection}
          initialPosition={initialPosition}
          isModalOpen={this.state.isModalOpen}
          onBackdropPress={this.onBackdropPress}
        />
      </RootWrapper>
    );
  }
  toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });
  onBackdropPress = () => this.setState({ isModalOpen: false });
}

export default ModalContainer;
