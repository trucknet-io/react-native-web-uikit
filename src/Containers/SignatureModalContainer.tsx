import * as React from "react";
import { View } from "react-native";
import SignatureModal from "src/Components/SignatureModal";
import { GradientButton } from "src/Components/Buttons";
import { isWeb } from "src/Helpers/platform";
import { ParsedDataUrlType } from "src/Helpers/regexHelpers";

type Props = {
  isVisible: boolean;
  onBackdropPress(): void;
  onSignApply(data?: ParsedDataUrlType): void;
  submitButtonLabel: string;
  cancelButtonLabel: string;
  headerText?: string;
  helperText?: string;
  theme?: "dark" | "light";
};

class SignatureModalContainer extends React.PureComponent<Props> {
  state = {
    isVisible: this.props.isVisible,
  };

  public componentWillReceiveProps = (nextProps) => {
    if (nextProps.isVisible !== this.props.isVisible) {
      this.setState({ isVisible: nextProps.isVisible });
    }
  };
  public render() {
    return (
      <React.Fragment>
        <GradientButton
          label="show signature modal"
          width={180}
          onPress={this.showSignatureModal}
          marginVertical={20}
        />
        <SignatureModal
          {...this.props}
          isVisible={this.state.isVisible}
          onSignApply={this.onSignApply}
          onBackdropPress={this.onBackdropPress}
        />
      </React.Fragment>
    );
  }

  private showSignatureModal = () => {
    if (isWeb) {
      // @ts-ignore
      return location.reload();
    }
    this.setState({ isVisible: true });
  };
  private onSignApply = (data) => {
    this.props.onSignApply(data);
    this.setState({ isVisible: false });
  };
  private onBackdropPress = () => {
    this.props.onBackdropPress();
    this.setState({ isVisible: false });
  };
}

export default SignatureModalContainer;
