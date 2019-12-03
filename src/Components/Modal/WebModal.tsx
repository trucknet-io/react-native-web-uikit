import * as React from "react";
import * as ReactDOM from "react-dom";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ModalProps } from "react-native-modal";
import getShadowStyles from "src/Themes/getShadowStyle";
import Colors from "src/Themes/Colors";

interface IWebModalProps extends ModalProps {}

class WebModal extends React.PureComponent<IWebModalProps> {
  private documentBody = document.getElementsByTagName("body")[0];
  private domElement = document.createElement("div");
  static defaultProps = {
    style: {
      padding: "2%",
      backdropColor: Colors.shadow,
    },
  };
  constructor(props: IWebModalProps) {
    super(props);
  }
  public componentDidMount = () => {
    this.documentBody.appendChild(this.domElement);
    this.handleModalShow();
  };

  public componentDidUpdate = (prevProps: IWebModalProps) => {
    if (this.props.isVisible && prevProps.isVisible !== this.props.isVisible) {
      this.handleModalShow();
    }
  };

  public componentWillUnmount = () => {
    this.documentBody.removeChild(this.domElement);
  };
  public render() {
    return this.renderWebModal();
  }

  private renderWebModal = () => {
    return ReactDOM.createPortal(
      <View style={[styles.container, { backgroundColor: this.props.backdropColor }, this.props.style]}>
        <TouchableOpacity
          onPress={this.props.onBackdropPress}
          style={[styles.container, { backgroundColor: undefined }]}
        />
        <View style={styles.childrenContainer}>{this.props.children}</View>
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
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    ...getShadowStyles(10),
  },
  childrenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    ...getShadowStyles(12),
  },
});
