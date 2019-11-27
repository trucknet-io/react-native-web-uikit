import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "src/Themes/Colors";
import Subscriber from "src/Subscriber";
import { TransparentButton } from "src/Components/Buttons";
import { ChevronRight, ChevronLeft, ChevronUp, ChevronDown } from "src/Components/Icons";

type ModalViewProps = {
  buttonWidth: string | number;
  verticalDirection?: boolean;
  modalId: string;
};

class ModalView extends React.PureComponent<ModalViewProps> {
  state = {
    subModalOpen: false,
  };
  render() {
    return <View style={styles.modalViewContainer}>{this.renderButtons()}</View>;
  }

  stretchModal = () => {
    Subscriber.stretchModal(this.props.modalId, "10%");
  };

  changeModalPosition = (position: string | number) => {
    Subscriber.changeModalPosition(this.props.modalId, position);
  };

  renderButtons = () => {
    return (
      <View style={[styles.buttonsContainer, { flexDirection: "row" }]}>
        <TransparentButton
          width={this.props.buttonWidth}
          onPressIn={this.stretchModal}
          onPressOut={() => this.changeModalPosition("-60%")}>
          <ChevronLeft color={Colors.palette.white} />
        </TransparentButton>
        <TransparentButton width={150} onPress={this.renderVerticalModal}>
          <Text style={{ color: Colors.palette.white }}>Show Vertical Modal</Text>
        </TransparentButton>
        <TransparentButton
          width={this.props.buttonWidth}
          onPressIn={this.stretchModal}
          onPressOut={() => this.changeModalPosition("60%")}>
          <ChevronRight color={Colors.palette.white} />
        </TransparentButton>
      </View>
    );
  };

  renderVerticalButtons = () => {
    return (
      <View style={[styles.buttonsContainer, { flexDirection: "column" }]}>
        <TransparentButton
          width={this.props.buttonWidth}
          onPressIn={() => Subscriber.stretchModal("1", "10%")}
          onPressOut={() => Subscriber.changeModalPosition("1", "-50%")}>
          <ChevronUp color={Colors.palette.white} />
        </TransparentButton>
        <TransparentButton
          width={this.props.buttonWidth}
          onPressIn={() => Subscriber.stretchModal("1", "10%")}
          onPressOut={() => Subscriber.changeModalPosition("1", "50%")}>
          <ChevronDown color={Colors.palette.white} />
        </TransparentButton>
      </View>
    );
  };

  renderSubModalView = () => <View style={styles.subModalContainer}>{this.renderVerticalButtons()}</View>;

  renderVerticalModal = () => {
    const getModalStyles = () => {
      return { top: "50%", left: "20%", height: "100%", width: "60%", borderRadius: 35 };
    };
    Subscriber.showModal(this.renderSubModalView(), {
      id: "1",
      containerStyles: getModalStyles(),
      verticalDirection: true,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 40,
    justifyContent: "center",
  },
  modalViewContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.palette.purpleLight,
    borderRadius: 5,
  },
  buttonsContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subModalContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.palette.ashLight,
    borderRadius: 10,
  },
});

export default ModalView;
