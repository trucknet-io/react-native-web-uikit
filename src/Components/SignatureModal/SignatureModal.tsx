import Colors, { colorTheme } from "../../Themes/Colors";
import Fonts from "../../Themes/Fonts";
import { parseDataUrl, ParsedDataUrlType } from "../../Helpers/regexHelpers";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import NativeModal from "react-native-modal";
import WebModal from "modal-react-native-web";
import { TransparentButtonWithChildren } from "../Buttons";
import { canvasHTML } from "./canvasHTML";
import WebView from "react-native-webview";
import { isWeb } from "../../Helpers/platform";

type Props = {
  isVisible: boolean;
  onBackdropPress(): void;
  onSignApply(data: ParsedDataUrlType): void;
  submitButtonLabel: string;
  cancelButtonLabel: string;
  headerText?: string;
  helperText?: string;
  theme: "light" | "dark";
};

type State = {
  signatureData?: ParsedDataUrlType;
  isSignSubmitted: boolean;
  colors: typeof colorTheme;
};

class SignatureModal extends React.PureComponent<Props> {
  static defaultProps = {
    backgroundColor: Colors.white,
    submitButtonLabel: "ok",
    cancelButtonLabel: "cancel",
    theme: "light",
  };
  private webView;
  public state: State = {
    signatureData: undefined,
    isSignSubmitted: false,
    colors: colorTheme,
  };
  public render() {
    return <View>{isWeb ? this.renderWebModal() : this.renderNativeModal()}</View>;
  }

  private renderButtons = () => {
    const theme = this.state.colors[this.props.theme];
    const isDisabled = this.state.isSignSubmitted || !this.state.signatureData;
    const submitButtonTextColor = isDisabled ? theme.lightGray : theme.themeColor;
    return (
      <View style={styles.buttonsContainer}>
        <TransparentButtonWithChildren onPress={this.resetWebView} width={60}>
          <Text style={[styles.buttonText, { color: theme.defaultText, width: 60 }]}>
            {this.props.cancelButtonLabel.toUpperCase()}
          </Text>
        </TransparentButtonWithChildren>
        <TransparentButtonWithChildren disabled={isDisabled} onPress={this.sendSignature} width={40}>
          <Text style={[styles.buttonText, { color: submitButtonTextColor, width: 40 }]}>
            {this.props.submitButtonLabel.toUpperCase()}
          </Text>
        </TransparentButtonWithChildren>
      </View>
    );
  };

  private renderNativeModal = () => (
    <NativeModal
      isVisible={this.props.isVisible}
      onBackdropPress={this.props.onBackdropPress}
      onModalShow={this.unSubmitSignApply}>
      {this.renderSignView()}
    </NativeModal>
  );

  private renderWebModal = () => (
    <WebModal
      visible={this.props.isVisible}
      onBackdropPress={this.props.onBackdropPress}
      onModalShow={this.unSubmitSignApply}>
      {this.renderSignView()}
    </WebModal>
  );

  renderSignView = () => {
    const theme = this.state.colors[this.props.theme];
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {this.renderHeaderText()}
        {this.renderHelperText()}
        <View style={[styles.webViewContainer, { backgroundColor: theme.webViewBackground }]}>
          <WebView
            ref={this.setWebViewRef}
            onMessage={this.onMessage}
            style={[styles.webView, { backgroundColor: theme.webViewBackground }]}
            automaticallyAdjustContentInsets={false}
            javaScriptEnabled={true}
            source={{ html: canvasHTML }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {this.renderButtons()}
      </View>
    );
  };
  private renderHeaderText = () => {
    const theme = this.state.colors[this.props.theme];
    if (this.props.headerText) {
      return <Text style={[styles.headerText, { color: theme.defaultText }]}>{this.props.headerText}</Text>;
    }
    return;
  };
  private renderHelperText = () => {
    const theme = this.state.colors[this.props.theme];
    if (this.props.helperText) {
      return <Text style={[styles.helperText, { color: theme.defaultText }]}>{this.props.helperText}</Text>;
    }
    return;
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
    const signatureData = this.state.signatureData as ParsedDataUrlType;
    this.submitSignApply();
    this.props.onSignApply(signatureData);
  };
  private resetWebView = () => {
    if (isWeb) {
      // @ts-ignore
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
    paddingHorizontal: 20,
    paddingTop: 10,
    borderRadius: 5,
  },
  webViewContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    borderColor: Colors.veryLightGray,
  },
  webView: {
    flex: 1,
    borderRadius: 5,
  },
  buttonsContainer: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  headerText: {
    ...Fonts.style.Title,
  },
  helperText: {
    ...Fonts.style.SubTitle2,
  },
  buttonText: {
    flex: 1,
    ...Fonts.style.Button,
    textAlign: "right",
  },
});
