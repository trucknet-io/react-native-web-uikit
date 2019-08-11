import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SignatureModal from "../Components/SignatureModal";

type Props = {
  isVisible: boolean;
  // onBackdropPress(): void;
  // onSignApply(data: string): void;
  cancelButtonLabel: string;
  submitButtonLabel: string;
  currentStatus?: string;
  headerText?: string;
  helperText?: string;
  backgroundColor?: string;
};

class SignatureModalContainer extends React.PureComponent<Props> {
  state = {
    isVisible: this.props.isVisible,
  };
  public render() {
    return (
      <SignatureModal
        {...this.props}
        isVisible={this.state.isVisible}
        headerText="header"
        helperText="do what u need to do"
        onSignApply={this.onSignApply}
        onBackdropPress={this.onBackdropPress}
      />
    );
  }

  private onSignApply = (data) => {
    console.log(data);
  };
  private onBackdropPress = () => {
    this.setState({ isVisible: false });
  };
}

export default SignatureModalContainer;
