import * as React from "react";
import * as ReactDOM from "react-dom";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Modal, { ModalProps } from "react-native-modal";
import getShadowStyles from "src/Themes/getShadowStyle";
import { isWeb } from "src/Helpers/platform";
import Colors from "src/Themes/Colors";

const documentBody = document.getElementsByTagName("body")[0];

interface IProps {
  isVisible: ModalProps["isVisible"];
  children: ModalProps["children"];
  onBackdropPress?: ModalProps["onBackdropPress"];
  onModalShow?: ModalProps["onModalShow"];
}

export class SimpleModal extends React.PureComponent<IProps> {
  private el: Node;
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }
  public componentDidMount = () => {
    if (!documentBody) return;
    documentBody.appendChild(this.el);
    this.handleModalShow();
  };

  public componentDidUpdate = (prevProps) => {
    if (this.props.isVisible && prevProps.isVisible !== this.props.isVisible) {
      this.handleModalShow();
    }
  };

  public componentWillUnmount = () => {
    if (!documentBody) return;
    documentBody.removeChild(this.el);
  };
  public render() {
    if (!isWeb) {
      return <Modal {...this.props}>{this.props.children}</Modal>;
    }
    return this.renderWebModal();
  }

  private renderWebModal = () => {
    return ReactDOM.createPortal(
      <View style={[styles.container, { display: this.props.isVisible ? "flex" : "none" }]}>
        <TouchableOpacity
          onPress={this.props.onBackdropPress}
          style={[styles.container, { backgroundColor: undefined }]}
        />
        <View style={styles.childrenContainer}>{this.props.children}</View>
      </View>,
      this.el,
    );
  };

  private handleModalShow = () => {
    if (!this.props.onModalShow) return;
    this.props.onModalShow();
  };
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.shadow,
    padding: "5%",
    borderRadius: 4,
    ...getShadowStyles(10),
  },
  childrenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    ...getShadowStyles(12),
  },
});
