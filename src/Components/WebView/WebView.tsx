import React, { useEffect } from "react";
import { ViewStyle } from "react-native";
import { WebViewProps } from "react-native-webview";

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

  if (source.html) {
    return <iframe src={`data:text/html;charset=UTF-8, ${source.html}`} style={styles.iframe} onLoad={onLoad} />;
  }
  if (source.uri) return <iframe src={source.uri} style={styles.iframe} onLoad={onLoad} />;
  return null;
};

const styles = {
  iframe: { display: "flex", flexGrow: 1 },
};
