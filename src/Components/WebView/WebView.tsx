import React, { useEffect } from "react";
import { ViewStyle } from "react-native";
import { WebViewProps } from "react-native-webview";
import * as srcDocPolyFill from "srcdoc-polyfill";

type Message = {
  nativeEvent: MessageEvent;
};

type NativeWebViewProps = Omit<WebViewProps, "onMessage" | "source" | "onLoad" | "onLoadStart">;

interface Props extends NativeWebViewProps {
  onMessage?: (e: Message) => void;
  source: { uri?: string; html?: string };
  onLoad?: (event: React.SyntheticEvent<HTMLIFrameElement, Event>) => void;
  onLoadStart?: () => void;
  style?: ViewStyle;
}

const IFrame = (props) => {
  const iframe = <iframe {...props} />;
  srcDocPolyFill.set(iframe);
  return iframe;
};

export default (props: Props) => {
  const { source, onLoadStart, onLoad, onMessage } = props;
  const { uri, html } = source;
  useEffect(
    () => {
      const handleMessage = (e: MessageEvent) => {
        if (!onMessage) return;
        onMessage({ nativeEvent: e });
      };

      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    },
    [html],
  );

  useEffect(
    () => {
      if (!onLoadStart) return;
      onLoadStart();
    },
    [uri, html],
  );

  if (source.html) return <IFrame srcDoc={source.html} style={styles.iframe} onLoad={onLoad} />;
  if (source.uri) return <IFrame src={source.uri} style={styles.iframe} onLoad={onLoad} />;
  return null;
};

const styles = {
  iframe: { display: "flex", flexGrow: 1 },
};
