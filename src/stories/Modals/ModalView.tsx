import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../Themes/Colors";
import Subscriber from "../../Subscriber";
import { TransparentButtonWithChildren } from "../../Components/Buttons";
import { ChevronRight, ChevronLeft, ChevronUp, ChevronDown } from "../../Components/Icons";
import { action } from "@storybook/addon-actions";

type ModalViewProps = {
  buttonWidth: string | number;
  verticalDirection?: boolean;
  modalId: number;
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
          <TransparentButtonWithChildren
            width={this.props.buttonWidth}
            onPressIn={this.stretchModal}
            onPressOut={() => this.changeModalPosition("-60%")}>
            <ChevronLeft color={Colors.white} />
          </TransparentButtonWithChildren>
          <TransparentButtonWithChildren
            width={this.props.buttonWidth}
            onPressIn={this.stretchModal}
            onPressOut={() => this.changeModalPosition("60%")}>
            <ChevronRight color={Colors.white} />
          </TransparentButtonWithChildren>
        </View>
      );
    }
    return (
      <View style={[styles.buttonsContainer, { flexDirection: "column" }]}>
        <TransparentButtonWithChildren
          width={this.props.buttonWidth}
          onPressIn={this.stretchModal}
          onPressOut={() => this.changeModalPosition("-50%")}>
          <ChevronUp color={Colors.white} />
        </TransparentButtonWithChildren>
        <TransparentButtonWithChildren
          width={this.props.buttonWidth}
          onPressIn={() => Subscriber.stretchModal(this.props.modalId, "10%")}
          onPressOut={() => this.changeModalPosition("50%")}>
          <ChevronDown color={Colors.white} />
        </TransparentButtonWithChildren>
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
    backgroundColor: Colors.themeLight,
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
