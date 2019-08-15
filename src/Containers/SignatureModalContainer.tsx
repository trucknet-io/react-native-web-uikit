import * as React from "react";
import { View } from "react-native";
import SignatureModal from "../Components/SignatureModal";
import { GradientButton } from "../Components/Buttons";
import { isWeb } from "../Helpers/platform";

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
      <View style={{ flex: 1 }}>
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
      </View>
    );
  }

  private showSignatureModal = () => {
    if (isWeb) {
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
