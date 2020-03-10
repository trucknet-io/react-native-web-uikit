import * as React from "react";
import WebView from "react-native-webview";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { WebViewProps } from "react-native-webview";
import colors from "src/Themes/Colors";

const WebViewLoader = (props: WebViewProps) => {
  const [isLoad, setIsLoad] = React.useState(false);
  const startIsLoad = () => setIsLoad(true);
  const endIsLoad = () => setIsLoad(false);
  return (
    <React.Fragment>
      {isLoad ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.themeColor} />
        </View>
      ) : null}
      <WebView {...props} onLoadStart={startIsLoad} onLoad={endIsLoad} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "40%",
    margin: "auto",
    elevation: 5,
  },
});

export default WebViewLoader;
