import Colors from "src/Themes/Colors";
import { parseDataUrl, ParsedDataUrlType } from "src/Helpers/regexHelpers";
import * as React from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import Modal from "src/Components/Modal";
import { TransparentButton } from "src/Components/Buttons";
import { canvasHTML } from "./canvasHTML";
import WebView from "react-native-webview";
import { isWeb } from "src/Helpers/platform";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type DefaultProps = {
  submitButtonLabel: React.ReactNode;
  cancelButtonLabel: React.ReactNode;
};

type Styles = ReturnType<typeof getStyles>;

interface Props extends DefaultProps, ThemeProps<Styles> {
  isVisible: boolean;
  onBackdropPress(): void;
  onSignApply(data: ParsedDataUrlType): void;
  headerText?: React.ReactNode;
  helperText?: React.ReactNode;
}

type State = {
  signatureData?: ParsedDataUrlType;
  isSignSubmitted: boolean;
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
  };
  private webView;
  public state: State = {
    signatureData: undefined,
    isSignSubmitted: false,
    resetCount: 0,
  };
  public render() {
    return this.renderModal();
  }

  private renderButtons = () => {
    return (
      <View style={this.props.styles.buttonsContainer}>
        {this.state.isSignSubmitted ? this.renderActivityIndicator() : this.renderCancelButton()}
        {this.renderSubmitButton()}
      </View>
    );
  };
  private renderActivityIndicator = () => (
    <View style={this.props.styles.activityIndicatorContainer}>
      <ActivityIndicator />
    </View>
  );

  private renderCancelButton = () => {
    const { colors } = this.props;
    return (
      <TransparentButton onPress={this.resetWebView} style={this.props.styles.buttonTextContainer}>
        <Text style={[this.props.styles.buttonText, { color: colors.defaultText }]}>
          {this.props.cancelButtonLabel}
        </Text>
      </TransparentButton>
    );
  };

  private renderSubmitButton = () => {
    const { colors } = this.props;
    const isDisabled = this.state.isSignSubmitted || !this.state.signatureData;
    const submitButtonTextColor = isDisabled ? colors.palette.lightGray : colors.themeColor;
    return (
      <TransparentButton
        disabled={isDisabled}
        onPress={this.sendSignature}
        style={this.props.styles.buttonTextContainer}>
        <Text style={[this.props.styles.buttonText, { color: submitButtonTextColor }]}>
          {this.props.submitButtonLabel}
        </Text>
      </TransparentButton>
    );
  };
  private renderModal = () => (
    <Modal
      isVisible={this.props.isVisible}
      onBackdropPress={this.props.onBackdropPress}
      onModalShow={this.unSubmitSignApply}>
      {this.renderSignView()}
    </Modal>
  );

  renderSignView = () => {
    const { colors } = this.props;
    return (
      <View style={[this.props.styles.container, { backgroundColor: colors.background }]}>
        {this.renderHeaderText()}
        {this.renderHelperText()}
        <View style={[this.props.styles.webViewContainer, { backgroundColor: colors.webViewBackground }]}>
          <WebView
            ref={this.setWebViewRef}
            onMessage={this.onMessage}
            style={[this.props.styles.webView, { backgroundColor: colors.webViewBackground }]}
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
    const { colors } = this.props;
    if (this.props.headerText) {
      return <Text style={[this.props.styles.headerText, { color: colors.defaultText }]}>{this.props.headerText}</Text>;
    }
    return;
  };
  private renderHelperText = () => {
    const { colors } = this.props;
    if (this.props.helperText) {
      return <Text style={[this.props.styles.helperText, { color: colors.defaultText }]}>{this.props.helperText}</Text>;
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

const getStyles = ({ colors, fonts }: ThemeParamsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 10,
      borderRadius: 5,
    },
    activityIndicatorContainer: {
      height: 48,
    },
    webViewContainer: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 5,
      padding: 2,
      borderColor: colors.palette.veryLightGray,
      marginTop: 15,
    },
    webView: {
      flex: 1,
      borderRadius: 5,
    },
    buttonsContainer: {
      marginTop: 25,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    headerText: {
      ...fonts.Title,
      marginVertical: 5,
    },
    helperText: {
      ...fonts.MTitle,
      marginVertical: 5,
    },
    buttonTextContainer: {
      marginHorizontal: 4,
      width: undefined,
    },
    buttonText: {
      ...fonts.SubTitle,
      textAlign: "right",
      textTransform: "uppercase",
    },
  });

export default withTheme<Props, DefaultProps>(getStyles)(SignatureModal);
