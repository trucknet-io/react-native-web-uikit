import * as React from "react";
import WebView from "react-native-webview";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { WebViewProps } from "react-native-webview";
import colors from "src/Themes/Colors";
import { getZIndex } from "src/Themes/variables";

const WebViewLoader = (props: WebViewProps) => {
  const [isLoad, setIsLoad] = React.useState(false);
  const toggleIsLoad = () => setIsLoad(!isLoad);
  return (
    <React.Fragment>
      {isLoad ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.themeColor} />
        </View>
      ) : null}
      <WebView {...props} onLoadStart={toggleIsLoad} onLoad={toggleIsLoad} />
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
    ...getZIndex,
  },
});

export default WebViewLoader;
