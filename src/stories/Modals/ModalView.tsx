import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "src/Themes/Colors";
import Subscriber from "src/Subscriber";
import { TransparentButton } from "src/Components/Buttons";
import { ChevronRight, ChevronLeft, ChevronUp, ChevronDown } from "src/Components/Icons";
import { action } from "@storybook/addon-actions";

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
    action(`onPressIn: Subscriber.stretchModal(id: number, stretchingValue?: string | number)`)(
      `Subscriber.stretchModal(${this.props.modalId}, "10%")`,
    );
    Subscriber.stretchModal(this.props.modalId, "10%");
  };

  changeModalPosition = (position: string | number) => {
    action(`onPressOut: Subscriber.changeModalPosition(id: number, positionShift: string | number)`)(
      `Subscriber.changeModalPosition(${this.props.modalId}, ${position})`,
    );
    Subscriber.changeModalPosition(this.props.modalId, position);
  };

  renderButtons = () => {
    if (!this.props.verticalDirection) {
      return (
        <View style={[styles.buttonsContainer, { flexDirection: "row" }]}>
          <TransparentButton
            width={this.props.buttonWidth}
            onPressIn={this.stretchModal}
            onPressOut={() => this.changeModalPosition("-60%")}>
            <ChevronLeft color={Colors.palette.white} />
          </TransparentButton>
          <TransparentButton
            width={this.props.buttonWidth}
            onPressIn={this.stretchModal}
            onPressOut={() => this.changeModalPosition("60%")}>
            <ChevronRight color={Colors.palette.white} />
          </TransparentButton>
        </View>
      );
    }
    return (
      <View style={[styles.buttonsContainer, { flexDirection: "column" }]}>
        <TransparentButton
          width={this.props.buttonWidth}
          onPressIn={this.stretchModal}
          onPressOut={() => this.changeModalPosition("-50%")}>
          <ChevronUp color={Colors.palette.white} />
        </TransparentButton>
        <TransparentButton
          width={this.props.buttonWidth}
          onPressIn={() => Subscriber.stretchModal(this.props.modalId, "10%")}
          onPressOut={() => this.changeModalPosition("50%")}>
          <ChevronDown color={Colors.palette.white} />
        </TransparentButton>
      </View>
    );
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
    borderRadius: 25,
  },
  buttonsContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ModalView;
