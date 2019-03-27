import React from "react";
import { Dimensions, Button } from "react-native";
import { number, boolean, text, object } from "@storybook/addon-knobs/react";
import RootWrapper from "../../Wrappers/RootWrapper";
import Subscriber from "../../Subscriber";
import Modal from "../../Components/Modal";
import ModalView from "./ModalView";

const ModalStory = () => {
  const getModalStyles = (verticalDirection: boolean) => {
    if (verticalDirection) {
      return { top: "-50%", left: "20%", height: "100%", width: "60%", borderRadius: 35 };
    }

    return { top: "20%", left: "-40%", height: "60%", width: "60%", borderRadius: 35 };
  };

  let verticalDirection = boolean("verticalDirection", false);
  const id = number("id", 123321);
  const modalStyles = object("modalStyles", getModalStyles(verticalDirection));
  const isModalOpen = boolean("isModalOpen", true);
  const shadow = number("shadow", 10);
  const initialPosition = text("initialModalPosition", "-100%");
  const dontShowBackdrop = boolean("dontShowBackdrop", false);
  const component = <ModalView buttonWidth={100} verticalDirection={verticalDirection} modalId={id} />;

  const showModal = () => {
    Subscriber.showModal(component, {
      id,
      containerStyles: modalStyles,
      shadow,
      verticalDirection,
      initialPosition,
      dontShowBackdrop,
    });
  };

  return (
    <RootWrapper
      styles={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: Dimensions.get("window").height,
      }}>
      <Button title="Show Modal" onPress={showModal} />
      <Modal
        id={id}
        component={component}
        containerStyles={modalStyles}
        shadow={shadow}
        dontShowBackdrop={dontShowBackdrop}
        verticalDirection={verticalDirection}
        initialPosition={text("initialModalPosition", "-100%")}
        isModalOpen={isModalOpen}
        onBackdropPress={undefined}
      />
    </RootWrapper>
  );
};

export default ModalStory;
