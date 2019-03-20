import * as React from "react";
import { View, StyleSheet } from "react-native";
import { TransparentButtonWithChildren, GradientButton } from "../Components/Buttons";
import Colors from "../Themes/Colors";
import Subscriber from "../Subscriber";
import { ChevronRight, ChevronLeft, Handler } from "../Components/Icons";

type ModalViewProps = {
  width: string | number;
};

class ModalView extends React.PureComponent<ModalViewProps> {
  state = {
    subModalOpen: false,
  };
  render() {
    return (
      <View style={styles.modalViewContainer}>
        <View style={styles.buttonsContainer}>
          <TransparentButtonWithChildren
            width={this.props.width}
            onPressIn={() => Subscriber.stretchModal(123, "10%")}
            onPressOut={() => Subscriber.changeModalPosition(123, "-60%")}>
            <ChevronLeft color={Colors.white} />
          </TransparentButtonWithChildren>
          <GradientButton
            label="Show Vertical Modal"
            width={300}
            onPress={this.showSubModal}
            gradientStartColor={Colors.ashDark}
            gradientEndColor={Colors.ashLight}
          />
          <TransparentButtonWithChildren
            width={this.props.width}
            onPressIn={() => Subscriber.stretchModal(123, "10%")}
            onPressOut={() => Subscriber.changeModalPosition(123, "60%")}>
            <ChevronRight color={Colors.white} />
          </TransparentButtonWithChildren>
        </View>
      </View>
    );
  }

  modalViewSubContainer = () => (
    <View style={styles.subModalContainer}>
      <TransparentButtonWithChildren
        width={this.props.width}
        onPressIn={this.handleStretchModal}
        onPressOut={this.handleChangePosition}>
        <Handler color={Colors.white} />
      </TransparentButtonWithChildren>
    </View>
  );

  showSubModal = () => {
    this.setState({ subModalOpen: false });
    const modalStyles = {
      top: "60%",
      left: "20%",
      height: "110%",
      width: "60%",
      borderRadius: 12,
    };

    Subscriber.showModal(this.modalViewSubContainer(), {
      id: 1,
      containerStyles: modalStyles,
      verticalDirection: true,
    });
  };
  handleStretchModal = () => {
    if (this.state.subModalOpen) return Subscriber.stretchModal(1, "-10%");
    return Subscriber.stretchModal(1, "10%");
  };

  handleChangePosition = () => {
    this.setState({ subModalOpen: !this.state.subModalOpen }, this.changeSubModalPosition);
  };

  changeSubModalPosition = () => {
    if (this.state.subModalOpen) return Subscriber.changeModalPosition(1, "-60%");
    return Subscriber.changeModalPosition(1, "60%");
  };
}

class ModalsContainer extends React.PureComponent {
  public render() {
    return (
      <View style={styles.container}>
        <GradientButton
          label="Show Modal"
          width="100%"
          onPress={this.showModal}
          gradientStartColor={Colors.themeGradient.gradientColor1}
          gradientEndColor={Colors.themeGradient.gradientColor2}
        />
      </View>
    );
  }

  private showModal = () => {
    const modalStyles = { top: "10%", left: "-50%", height: "80%", width: "80%", borderRadius: 35 };
    Subscriber.showModal(<ModalView width={100} />, {
      id: 123,
      containerStyles: modalStyles,
      shadow: 10,
      dontShowBackdrop: false,
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
    backgroundColor: Colors.themeLight,
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subModalContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.ashLight,
    borderRadius: 10,
  },
});

export default ModalsContainer;
