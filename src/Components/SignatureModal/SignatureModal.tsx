import Colors, { colorTheme, ColorType } from "src/Themes/Colors";
import { parseDataUrl, ParsedDataUrlType } from "src/Helpers/regexHelpers";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { TransparentButtonWithChildren } from "src/Components/Buttons";
import { canvasHTML } from "./canvasHTML";
import WebView from "react-native-webview";
import { isWeb } from "src/Helpers/platform";
import withTheme, { SetStyleParamsType } from "src/Themes/withTheme";

type Style = ReturnType<typeof setStyle>;

type Props = {
  isVisible: boolean;
  onBackdropPress(): void;
  onSignApply(data: ParsedDataUrlType): void;
  submitButtonLabel: string;
  cancelButtonLabel: string;
  headerText?: string;
  helperText?: string;
  style: Style;
  color: ColorType;
};

type State = {
  signatureData?: ParsedDataUrlType;
  isSignSubmitted: boolean;
  colors: typeof colorTheme;
  /**
   * Change it to rerender webview, when reset is needed
   */
  resetCount: number;
};

class SignatureModal extends React.PureComponent<Props> {
  static defaultProps = {
    backgroundColor: Colors.palette.white,
    submitButtonLabel: "ok",
    cancelButtonLabel: "cancel",
    theme: "light",
  };
  private webView;
  public state: State = {
    signatureData: undefined,
    isSignSubmitted: false,
    colors: colorTheme,
    resetCount: 0,
  };
  public render() {
    return <View>{isWeb ? this.renderWebModal() : this.renderNativeModal()}</View>;
  }

  private renderButtons = () => {
    const { style, color } = this.props;
    const isDisabled = this.state.isSignSubmitted || !this.state.signatureData;
    const submitButtonTextColor = isDisabled ? color.palette.lightGray : color.themeColor;
    return (
      <View style={style.buttonsContainer}>
        <TransparentButtonWithChildren onPress={this.resetWebView} width={60}>
          <Text style={style.buttonText}>{this.props.cancelButtonLabel.toUpperCase()}</Text>
        </TransparentButtonWithChildren>
        <TransparentButtonWithChildren disabled={isDisabled} onPress={this.sendSignature} width={40}>
          <Text style={[style.submitButtonText, { color: submitButtonTextColor }]}>
            {this.props.submitButtonLabel.toUpperCase()}
          </Text>
        </TransparentButtonWithChildren>
      </View>
    );
  };

  private renderNativeModal = () => (
    <Modal
      isVisible={this.props.isVisible}
      onBackdropPress={this.props.onBackdropPress}
      onModalShow={this.unSubmitSignApply}>
      {this.renderSignView()}
    </Modal>
  );

  private renderWebModal = () => (
    // @ts-ignore: visible right name for prop if import from modal-react-native-web
    <Modal
      ariaHideApp={false}
      visible={this.props.isVisible}
      onBackdropPress={this.props.onBackdropPress}
      onModalShow={this.unSubmitSignApply}>
      {this.renderSignView()}
    </Modal>
  );

  renderSignView = () => {
    const { style } = this.props;
    return (
      <View style={style.container}>
        {this.renderHeaderText()}
        {this.renderHelperText()}
        <View style={style.webViewContainer}>
          <WebView
            ref={this.setWebViewRef}
            onMessage={this.onMessage}
            style={style.webView}
            automaticallyAdjustContentInsets={false}
            javaScriptEnabled={true}
            source={{ html: canvasHTML }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            key={this.state.resetCount}
          />
        </View>
        {this.renderButtons()}
      </View>
    );
  };
  private renderHeaderText = () => {
    if (this.props.headerText) {
      return <Text style={this.props.style.headerText}>{this.props.headerText}</Text>;
    }
    return;
  };
  private renderHelperText = () => {
    if (this.props.helperText) {
      return <Text style={this.props.style.helperText}>{this.props.helperText}</Text>;
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
    this.setState({ signatureData: undefined }, this.unSubmitSignApply);
    this.setState({ resetCount: this.state.resetCount + 1 });
  };
  private submitSignApply = () => {
    this.setState({ isSignSubmitted: true });
  };

  private unSubmitSignApply = () => {
    this.setState({ isSignSubmitted: false });
  };
}
const setStyle = ({ color, font }: SetStyleParamsType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 10,
      borderRadius: 5,
      backgroundColor: color.background,
    },
    webViewContainer: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 5,
      padding: 2,
      borderColor: color.palette.veryLightGray,
      backgroundColor: color.webViewBackground,
    },
    webView: {
      flex: 1,
      borderRadius: 5,
      backgroundColor: color.webViewBackground,
    },
    buttonsContainer: {
      marginTop: 25,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    headerText: font.MTitle,
    helperText: font.SubTitle,
    buttonText: {
      flex: 1,
      textAlign: "right",
      width: 60,
      ...font.BodyRegular,
    },
    submitButtonText: {
      flex: 1,
      width: 40,
      textAlign: "right",
      ...font.BodyRegular,
    },
  });
};

export default withTheme<Props, Style>(setStyle)(SignatureModal);
