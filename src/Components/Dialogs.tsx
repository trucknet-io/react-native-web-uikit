import * as React from "react";
import { Button, Alert } from "react-native";

class Dialog extends React.PureComponent {
  render() {
    return <Button onPress={this.onPress} title="aleert" />;
  }

  onPress = () => {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        { text: "Ask me later", onPress: () => console.log("Ask me later pressed") },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false },
    );
  };
}

export default Dialog;
