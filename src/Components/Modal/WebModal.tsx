import * as React from "react";
import * as ReactDOM from "react-dom";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ModalProps } from "react-native-modal";
import getShadowStyles from "src/Themes/getShadowStyle";
import Colors from "src/Themes/Colors";

class WebModal extends React.PureComponent<ModalProps> {
  private documentBody = document.getElementsByTagName("body")[0];
  private domElement = document.createElement("div");
  static defaultProps = {
    backdropColor: Colors.shadow,
  };

  public componentDidMount = () => {
    this.documentBody.appendChild(this.domElement);
    this.handleModalShow();
  };

  public componentWillUnmount = () => {
    this.documentBody.removeChild(this.domElement);
  };
  public render() {
    return this.renderWebModal();
  }

  private renderWebModal = () => {
    return ReactDOM.createPortal(
      <View style={[styles.backdrop, { backgroundColor: this.props.backdropColor }, this.props.style]}>
        <TouchableOpacity
          onPress={this.props.onBackdropPress}
          style={[styles.backdrop, { backgroundColor: undefined }]}
        />
        <View style={styles.content}>{this.props.children}</View>
      </View>,
      this.domElement,
    );
  };

  private handleModalShow = () => {
    if (!this.props.onModalShow) return;
    this.props.onModalShow();
  };
}

export default WebModal;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: "2%",
    ...getShadowStyles(10),
  },
  content: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.background,
    ...getShadowStyles(12),
  },
});
