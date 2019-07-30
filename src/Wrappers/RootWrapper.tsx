import * as React from "react";
import { StyleSheet, View, Dimensions, Animated } from "react-native";
import Subscriber, { modalPropertiesType, IdType } from "../Subscriber";
import createShadow from "../Themes/Shadow";
import Colors from "../Themes/Colors";

type Props = {
  styles: any;
};

type modalType = {
  component: React.ReactNode;
  id: IdType;
  onBackdropPress?: Function;
  containerStyles?: any;
  position: Animated.Value;
  initialPosition: number;
  closeOnBackdropPress?: boolean;
  initialTop: number;
  initialLeft: number;
  initialWidth: number;
  initialHeight: number;
  verticalDirection: boolean;
  shadow: number;
};

type State = {
  showModal: boolean;
  modals: Array<modalType>;
  modalVerticalPosition: Animated.Value;
  showBackDrop: boolean;
};

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

class RootWrapper extends React.PureComponent<Props, State> {
  private INITIAL_MODAL_HORIZONTAL_POSITION = -windowWidth;
  private INITIAL_MODAL_VERTICAL_POSITION = 2 * windowHeight;

  public state: State = {
    showModal: false,
    modals: [],
    modalVerticalPosition: new Animated.Value(0),
    showBackDrop: false,
  };
  public componentDidMount = () => {
    Subscriber.subscribeShowModal(this.showModal);
    Subscriber.subscribeHideModal(this.deleteModalsById);
    Subscriber.subscribeStretchModal(this.animateModalStretch);
    Subscriber.subscribeChangeModalPosition(this.changeModalPosition);
  };
  public render() {
    return (
      <View style={this.props.styles}>
        {this.props.children}
        {this.renderBackDrop()}
        {this.renderModals()}
      </View>
    );
  }

  private renderBackDrop = () => {
    if (this.state.showBackDrop) {
      return (
        <View
          style={[styles.backDropContainer, { ...createShadow(this.state.modals[0].shadow - 1) }]}
          onStartShouldSetResponder={() => true}
          onResponderGrant={this.onBackDropPress}
        />
      );
    }

    return undefined;
  };

  private onBackDropPress = () => {
    const modal = this.state.modals[0];
    if (modal) {
      if (modal.onBackdropPress) {
        return modal.onBackdropPress();
      }
      if (modal.closeOnBackdropPress) {
        return this.animateModalsDisappearanceSequence(0);
      }
    }
  };

  private renderModals = () => {
    if (this.state.modals.length > 0) {
      // @ts-ignore
      return this.state.modals.map(this.renderModal);
    }

    return undefined;
  };

  private renderModal = (modal: modalType, index: number) => {
    if (modal && modal.verticalDirection) return this.renderVerticalModal(modal, index);
    return this.renderHorizontalModal(modal, index);
  };

  private renderVerticalModal = (modal: modalType, index: number) => {
    this.animateModalVerticalAppearance(index);
    return (
      <Animated.View
        key={index}
        style={[
          styles.modalContainer,
          modal.containerStyles,
          {
            top: modal.position,
            left: modal.containerStyles.left,
            width: modal.containerStyles.width,
            height: modal.containerStyles.height,
            ...createShadow(modal.shadow),
          },
        ]}
        onStartShouldSetResponder={() => true}
        onResponderGrant={() => this.animateModalsDisappearanceSequence(index + 1)}>
        {modal.component}
      </Animated.View>
    );
  };

  private renderHorizontalModal = (modal: modalType, index: number) => {
    this.animateModalHorizontalAppearance(index);
    return (
      <Animated.View
        key={index}
        style={[
          styles.modalContainer,
          modal.containerStyles,
          {
            top: modal.containerStyles.top,
            left: modal.position,
            width: modal.containerStyles.width,
            height: modal.containerStyles.height,
            ...createShadow(modal.shadow),
          },
        ]}
        onStartShouldSetResponder={() => true}
        onResponderGrant={() => this.animateModalsDisappearanceSequence(index + 1)}>
        {modal.component}
      </Animated.View>
    );
  };

  private animateModalVerticalAppearance = (index: number) => {
    const modal = this.state.modals[index];
    const { animateWidth, animateHeight, animateLeft, animateVerticalPosition } = this.animateAppearance(modal);
    if (modal) {
      Animated.parallel([animateWidth(), animateHeight(), animateLeft(), animateVerticalPosition()]).start();
    }
  };

  private animateModalHorizontalAppearance = (index: number) => {
    const modal = this.state.modals[index];
    const { animateWidth, animateHeight, animateTop, animateHorizontalPosition } = this.animateAppearance(modal);
    if (modal) {
      Animated.parallel([animateWidth(), animateHeight(), animateTop(), animateHorizontalPosition()]).start();
    }
  };

  animateAppearance = (modal: modalType) => ({
    animateWidth: () =>
      Animated.timing(modal.containerStyles.width, {
        toValue: modal.initialWidth,
        duration: 200,
      }),
    animateHeight: () =>
      Animated.timing(modal.containerStyles.height, {
        toValue: modal.initialHeight,
        duration: 200,
      }),
    animateLeft: () =>
      Animated.timing(modal.containerStyles.left, {
        toValue: modal.initialLeft,
        duration: 200,
      }),
    animateTop: () =>
      Animated.timing(modal.containerStyles.top, {
        toValue: modal.initialTop,
        duration: 200,
      }),
    animateVerticalPosition: () =>
      Animated.spring(modal.position, {
        toValue: modal.containerStyles.top,
        bounciness: 12,
      }),
    animateHorizontalPosition: () =>
      Animated.spring(modal.position, {
        toValue: modal.containerStyles.left,
        bounciness: 12,
      }),
  });

  private animateModalStretch = (id: IdType, stretchingValue: number | string = "5%") => {
    const modalIndex = this.findModalIndexById(id);
    const modal = this.state.modals[modalIndex];
    if (modal) {
      if (modal.verticalDirection) return this.animateModalVerticalStretch(modal, stretchingValue);
      return this.animateModalHorizontalStretch(modal, stretchingValue);
    }
  };

  private animateModalVerticalStretch = (modal: modalType, stretchingValue: number | string) => {
    const stretchAnimation = this.animateVerticalStretch(modal, stretchingValue);
    const { animateWidth, animateHeight, animateLeft, animatePosition } = stretchAnimation;
    Animated.parallel([animateWidth(), animateHeight(), animateLeft(), animatePosition()]).start();
  };

  private animateVerticalStretch = (modal: modalType, stretchingValue: number | string) => ({
    animateWidth: () =>
      Animated.timing(modal.containerStyles.width, {
        toValue: modal.initialWidth - this.parseModalHorizontalPositionStatement(stretchingValue),
        duration: 200,
      }),
    animateHeight: () =>
      Animated.timing(modal.containerStyles.height, {
        toValue: modal.initialHeight + this.parseModalVerticalPositionStatement(stretchingValue),
        duration: 200,
      }),
    animateLeft: () =>
      Animated.timing(modal.containerStyles.left, {
        toValue: modal.initialLeft + this.parseModalHorizontalPositionStretchingStatement(stretchingValue),
        duration: 200,
      }),
    animatePosition: () =>
      Animated.timing(modal.position, {
        toValue: modal.containerStyles.top - this.parseModalVerticalPositionStretchingStatement(stretchingValue),
        duration: 200,
      }),
  });

  private animateModalHorizontalStretch = (modal: modalType, stretchingValue: number | string) => {
    const stretchAnimation = this.animateHorizontalStretch(modal, stretchingValue);
    const { animateWidth, animateHeight, animateTop, animatePosition } = stretchAnimation;
    Animated.parallel([animateWidth(), animateHeight(), animateTop(), animatePosition()]).start();
  };

  private animateHorizontalStretch = (modal: modalType, stretchingValue: number | string) => ({
    animateWidth: () =>
      Animated.timing(modal.containerStyles.width, {
        toValue: modal.initialWidth + this.parseModalHorizontalPositionStatement(stretchingValue),
        duration: 200,
      }),
    animateHeight: () =>
      Animated.timing(modal.containerStyles.height, {
        toValue: modal.initialHeight - this.parseModalVerticalPositionStatement(stretchingValue),
        duration: 200,
      }),
    animateTop: () =>
      Animated.timing(modal.containerStyles.top, {
        toValue: modal.initialTop + this.parseModalVerticalPositionStretchingStatement(stretchingValue),
        duration: 200,
      }),
    animatePosition: () =>
      Animated.timing(modal.position, {
        toValue: modal.containerStyles.left - this.parseModalHorizontalPositionStretchingStatement(stretchingValue),
        duration: 200,
      }),
  });

  private changeModalPosition = (id: IdType, position: string | number) => {
    const modalIndex = this.findModalIndexById(id);
    const modals = this.state.modals.map((modal: modalType) => {
      if (modal.id === id && modal.verticalDirection) return this.changeModalVerticalPosition(modal, position);
      if (modal.id === id) return this.changeModalHorizontalPosition(modal, position);
      return modal;
    });
    this.setState({ modals }, () => {
      if (modals[modalIndex] && modals[modalIndex].verticalDirection) {
        return this.animateModalVerticalAppearance(modalIndex);
      }
      return this.animateModalHorizontalAppearance(modalIndex);
    });
  };

  private changeModalHorizontalPosition = (modal: modalType, position: string | number) => {
    return {
      ...modal,
      containerStyles: {
        ...modal.containerStyles,
        left: modal.containerStyles.left + this.parseModalHorizontalPositionStatement(position),
      },
    };
  };

  private changeModalVerticalPosition = (modal: modalType, position: string | number) => {
    return {
      ...modal,
      containerStyles: {
        ...modal.containerStyles,
        top: modal.containerStyles.top + this.parseModalVerticalPositionStatement(position),
      },
    };
  };

  private findModalIndexById = (id: IdType) => this.state.modals.findIndex((modal) => modal.id === id);

  private deleteModalsById = (id: IdType) => {
    let modalIndex = this.findModalIndexById(id);
    if (!id) modalIndex = 0;
    if (modalIndex >= 0) this.animateModalsDisappearanceSequence(modalIndex);
  };

  private animateModalsDisappearanceSequence = (modalIndex: number) => {
    const { modals } = this.state;
    const modalsToHide = modals.splice(modalIndex, modals.length);
    const sequenceOfModalDisappearanceAnimations = modalsToHide.map(this.animateModalDisappearance);
    Animated.sequence(sequenceOfModalDisappearanceAnimations.reverse()).start(() =>
      this.deleteModals(modals, modalIndex),
    );
  };

  private animateModalDisappearance = (modal: modalType) => {
    if (modal.verticalDirection) {
      return Animated.timing(modal.position, {
        toValue: modal.initialPosition,
        duration: 150,
      });
    }
    return Animated.timing(modal.position, {
      toValue: modal.initialPosition,
      duration: 150,
    });
  };

  private deleteModals = (modals: Array<modalType>, modalIndex: number) => {
    this.setState({
      showBackDrop: this.isModalBackDropShown(modalIndex),
      modals: [...modals],
    });
  };

  private isModalBackDropShown = (modalIndex: number) => {
    if (modalIndex === 0) return false;
    return this.state.showBackDrop;
  };

  private showModal = (component: React.ReactNode, properties: modalPropertiesType) => {
    if (this.isModalAlreadyExist(properties.id)) return undefined;
    return this.setState({
      showBackDrop: !properties.dontShowBackdrop,
      modals: [...this.state.modals, this.createCurrentModalState(component, properties)],
    });
  };

  private createCurrentModalState = (component: React.ReactNode, properties: modalPropertiesType) => {
    const containerStyles = this.parseContainerStyles(properties.containerStyles);
    const initialModalPosition = this.getInitialModalPosition(properties);
    return {
      component,
      id: properties.id || 0,
      onBackdropPress: properties.onBackdropPress,
      containerStyles: {
        ...containerStyles,
        top: this.setTopModalValue(properties, containerStyles.top),
        left: this.setLeftModalValue(properties, containerStyles.left),
        width: new Animated.Value(containerStyles.width),
        height: new Animated.Value(containerStyles.height),
      },
      initialTop: containerStyles.top,
      initialWidth: containerStyles.width,
      initialHeight: containerStyles.height,
      initialLeft: containerStyles.left,
      initialPosition: initialModalPosition,
      closeOnBackdropPress: !properties.onBackdropPress,
      verticalDirection: !!properties.verticalDirection,
      position: new Animated.Value(initialModalPosition),
      shadow: properties.shadow || 12,
    };
  };

  private getInitialModalPosition = (properties: modalPropertiesType) => {
    if (!properties.initialPosition && !properties.verticalDirection) {
      return this.INITIAL_MODAL_HORIZONTAL_POSITION;
    }
    if (properties.initialPosition && !properties.verticalDirection) {
      return this.parseModalHorizontalPositionStatement(properties.initialPosition);
    }
    if (properties.initialPosition && properties.verticalDirection) {
      return this.parseModalVerticalPositionStatement(properties.initialPosition);
    }
    return this.INITIAL_MODAL_VERTICAL_POSITION;
  };

  private setTopModalValue = (properties: modalPropertiesType, topValue: number) => {
    if (properties.verticalDirection) return topValue;
    return new Animated.Value(topValue);
  };

  private setLeftModalValue = (properties: modalPropertiesType, leftValue: number) => {
    if (properties.verticalDirection) return new Animated.Value(leftValue);
    return leftValue;
  };

  private isModalAlreadyExist = (id: IdType = 0) => {
    return !!this.state.modals.find((modal) => modal.id === id);
  };

  private parseContainerStyles = (modalContainerStyles: any) => {
    const { top, left, width, height } = modalContainerStyles;
    return {
      ...modalContainerStyles,
      top: this.parseModalVerticalPositionStatement(top),
      left: this.parseModalHorizontalPositionStatement(left),
      width: this.parseModalHorizontalPositionStatement(width),
      height: this.parseModalVerticalPositionStatement(height),
    };
  };

  private parseModalHorizontalPositionStatement = (statement: number | string) => {
    if (typeof statement === "number") return statement;
    return (parseInt(statement) / 100) * windowWidth;
  };

  private parseModalVerticalPositionStatement = (statement: number | string) => {
    if (typeof statement === "number") return statement;
    return (parseInt(statement) / 100) * windowHeight;
  };

  private parseModalVerticalPositionStretchingStatement = (statement: number | string) => {
    if (typeof statement === "number") return statement / 2;
    return (parseInt(statement) / 100 / 2) * windowHeight;
  };

  private parseModalHorizontalPositionStretchingStatement = (statement: number | string) => {
    if (typeof statement === "number") return statement / 2;
    return (parseInt(statement) / 100 / 2) * windowWidth;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backDropContainer: {
    position: "absolute",
    width: windowWidth,
    height: windowHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.shadow,
  },
  modalContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: undefined,
  },
});

// @ts-ignore
export default RootWrapper;
