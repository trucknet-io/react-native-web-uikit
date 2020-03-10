import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import WebView from "./WebView";
import WebViewLoader from "./WebViewLoader";
import { action } from "@storybook/addon-actions";
import { canvasHTML } from "src/Components/SignatureModal/canvasHTML";
import { canvasScript } from "src/Components/SignatureModal/canvasScript";
import { View, StyleSheet } from "react-native";

const stories = storiesOf("WebView|WebView", module).addParameters({ component: WebViewLoader });
stories.add("WebView with html", () => (
  <View style={styles.container}>
    <WebView
      onMessage={action("onMessage")}
      automaticallyAdjustContentInsets={false}
      javaScriptEnabled={true}
      source={{ html: canvasHTML }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      injectedJavaScript={canvasScript}
    />
  </View>
));

stories.add("WebViewLoader with uri", () => (
  <View style={[styles.container, { borderWidth: 0 }]}>
    <WebViewLoader
      style={styles.container}
      automaticallyAdjustContentInsets={false}
      source={{ uri: "https://app.trucknet.io/terms-and-conditions/en" }}
    />
  </View>
));

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: 500,
    borderWidth: 5,
    borderRadius: 4,
  },
});

export { stories };
