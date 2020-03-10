import Colors from "src/Themes/Colors";
import { parseDataUrl, ParsedDataUrlType } from "src/Helpers/regexHelpers";
import * as React from "react";
import { Text, View, StyleSheet, ActivityIndicator, ViewStyle } from "react-native";
import Modal from "src/Components/Modal";
import { TransparentButton } from "src/Components/Buttons";
import { canvasHTML } from "./canvasHTML";
import { canvasScript } from "./canvasScript";
import WebView from "react-native-webview";
import { isWeb } from "src/Helpers/platform";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type DefaultProps = {
  submitButtonLabel: React.ReactNode;
  cancelButtonLabel: React.ReactNode;
};

type Styles = ReturnType<typeof getStyles>;

interface OwnProps extends DefaultProps {
  isVisible: boolean;
  onBackdropPress(): void;
  onSignApply(data: ParsedDataUrlType): void;
  headerText?: React.ReactNode;
  helperText?: React.ReactNode;
  style?: ViewStyle;
}

interface Props extends OwnProps, ThemeProps<Styles> {}

type State = {
  signatureData?: ParsedDataUrlType;
  isSignSubmitted: boolean;
  /**
   * Change it to rerender webview, when reset is needed
   */
  resetCount: number;
};

export class PureSignatureModal extends React.PureComponent<Props> {
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
    return (
      <TransparentButton onPress={this.resetWebView} style={this.props.styles.buttonTextContainer}>
        <Text style={this.props.styles.buttonText}>{this.props.cancelButtonLabel}</Text>
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
      style={this.props.style}
      isVisible={this.props.isVisible}
      onBackdropPress={this.props.onBackdropPress}
      onModalShow={this.unSubmitSignApply}>
      {this.renderSignView()}
    </Modal>
  );

  renderSignView = () => {
    return (
      <View style={this.props.styles.container}>
        {this.renderHeaderText()}
        {this.renderHelperText()}
        <View style={this.props.styles.webViewContainer}>
          <WebView
            // ref={this.setWebViewRef}
            onMessage={this.onMessage}
            style={this.props.styles.webView}
            automaticallyAdjustContentInsets={false}
            javaScriptEnabled={true}
            source={{ html: canvasHTML }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            key={this.state.resetCount}
            injectedJavaScript={canvasScript}
          />
        </View>
        {this.renderButtons()}
      </View>
    );
  };
  private renderHeaderText = () => {
    if (this.props.headerText) {
      return <Text style={this.props.styles.headerText}>{this.props.headerText}</Text>;
    }
    return;
  };
  private renderHelperText = () => {
    if (this.props.helperText) {
      return <Text style={this.props.styles.helperText}>{this.props.helperText}</Text>;
    }
    return;
  };
  public setWebViewRef = (ref) => {
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
      backgroundColor: colors.background,
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
      backgroundColor: colors.webViewBackground,
    },
    webView: {
      flex: 1,
      borderRadius: 5,
      backgroundColor: colors.webViewBackground,
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
      color: colors.defaultText,
    },
    helperText: {
      ...fonts.MTitle,
      marginVertical: 5,
      color: colors.defaultText,
    },
    buttonTextContainer: {
      marginHorizontal: 4,
      width: undefined,
    },
    buttonText: {
      ...fonts.SubTitle,
      textAlign: "right",
      textTransform: "uppercase",
      color: colors.defaultText,
    },
  });

export default withTheme<Props, DefaultProps>(getStyles)(PureSignatureModal);
