import Colors from "../../Themes/Colors";
import Fonts from "../../Themes/Fonts";
import { parseDataUrl, ParsedDataUrlType } from "../../Helpers/regexHelpers";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { GradientButton } from "../Buttons";
import { canvasHTML } from "./canvasHTML";
import WebView from "react-native-webview";
import { isWeb } from "../../Helpers/platform";

type Props = {
  isVisible: boolean;
  onBackdropPress(): void;
  onSignApply(data: string): void;
  submitButtonLabel: string;
  cancelButtonLabel: string;
  headerText?: string;
  helperText?: string;
  backgroundColor?: string;
};

type State = {
  signatureData?: ParsedDataUrlType;
  isSignSubmitted: boolean;
};

class SignatureModal extends React.PureComponent<Props, State> {
  static defaultProps = {
    backgroundColor: Colors.white,
    submitButtonLabel: "ok",
    cancelButtonLabel: "cancel",
  };
  private webView;
  public state = {
    signatureData: undefined,
    isSignSubmitted: false,
  };
  public render() {
    const { backgroundColor } = this.props;
    return (
      //@ts-ignore
      <Modal
        {...this.setVisibleProps()}
        onBackdropPress={this.props.onBackdropPress}
        onModalShow={this.unSubmitSignApply}>
        <View style={[styles.container, { backgroundColor }]}>
          {this.renderHeaderText()}
          {this.renderHelperText()}
          <View style={{ flex: 1, borderWidth: 1 }}>
            <WebView
              ref={this.setWebViewRef}
              onMessage={this.onMessage}
              style={styles.webView}
              automaticallyAdjustContentInsets={false}
              javaScriptEnabled={true}
              source={{ html: canvasHTML }}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <GradientButton
              label={this.props.cancelButtonLabel}
              gradientStartColor={Colors.disableGray}
              gradientEndColor={Colors.disableGray}
              onPress={this.resetWebView}
              width={120}
              marginHorizontal={5}
            />
            <GradientButton
              label={this.props.submitButtonLabel}
              gradientStartColor={Colors.disableGray}
              gradientEndColor={Colors.disableGray}
              disabled={this.state.isSignSubmitted || !this.state.signatureData}
              onPress={this.sendSignature}
              width={120}
              marginHorizontal={5}
            />
          </View>
        </View>
      </Modal>
    );
  }

  private setVisibleProps = () => {
    if (isWeb) {
      return { visible: this.props.isVisible };
    }

    return { isVisible: this.props.isVisible };
  };

  private renderHeaderText = () => {
    if (this.props.headerText) {
      return <Text style={styles.headerText}>{this.props.headerText}</Text>;
    }
  };
  private renderHelperText = () => {
    if (this.props.helperText) {
      return <Text style={styles.helperText}>{this.props.helperText}</Text>;
    }
  };
  private setWebViewRef = (ref) => {
    this.webView = ref;
    if (this.webView && !isWeb) {
      this.webView.reload();
    }
  };
  private onMessage = (message: { nativeEvent: { data: string } }) => {
    const signatureData = parseDataUrl(message.nativeEvent.data);
    this.setState({ signatureData });
  };

  private sendSignature = () => {
    this.submitSignApply();
    this.props.onSignApply(this.state.signatureData.url);
  };
  private resetWebView = () => {
    if (isWeb) {
      return location.reload();
    }
    this.setState({ signatureData: undefined }, this.unSubmitSignApply);
    return this.webView.reload();
  };
  private submitSignApply = () => {
    this.setState({ isSignSubmitted: true });
  };

  private unSubmitSignApply = () => {
    this.setState({ isSignSubmitted: false });
  };
}
export default SignatureModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  webView: {
    flex: 1,
  },
  buttonsContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  headerText: {
    ...Fonts.style.MTitle,
  },
  helperText: {
    ...Fonts.style.BodyRegular,
  },
});
