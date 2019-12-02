import * as React from "react";
import * as ReactDOM from "react-dom";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Modal, { ModalProps } from "react-native-modal";
import getShadowStyles from "src/Themes/getShadowStyle";
import { isWeb } from "src/Helpers/platform";
import Colors from "src/Themes/Colors";

let documentBody: HTMLBodyElement;
let el: any;

if (isWeb) {
  documentBody = document.getElementsByTagName("body")[0];
  el = document.createElement("div");
}

interface IProps extends ModalProps {}

export class SimpleModal extends React.PureComponent<IProps> {
  static defaultProps = {
    style: {
      padding: "2%",
      backdropColor: Colors.shadow,
    },
  };
  constructor(props: IProps) {
    super(props);
  }
  public componentDidMount = () => {
    if (!isWeb) return;
    documentBody.appendChild(el);
    this.handleModalShow();
  };

  public componentDidUpdate = (prevProps: IProps) => {
    if (this.props.isVisible && prevProps.isVisible !== this.props.isVisible) {
      this.handleModalShow();
    }
  };

  public componentWillUnmount = () => {
    if (!isWeb) return;
    documentBody.removeChild(el);
  };
  public render() {
    if (!this.props.isVisible) return null;
    if (!isWeb) {
      return <Modal {...this.props}>{this.props.children}</Modal>;
    }
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
      el,
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
    ...getShadowStyles(10),
  },
  childrenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    ...getShadowStyles(12),
  },
});
