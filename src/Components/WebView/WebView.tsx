import getParsedHtml from "html-react-parser";
import React, { useEffect, useMemo } from "react";
import { ViewStyle } from "react-native";
import { WebViewProps } from "react-native-webview";

type Message = {
  nativeEvent: { data: string };
};

type NativeWebViewProps = Omit<WebViewProps, "onMessage" | "source" | "onLoad" | "onLoadStart">;

interface Props extends NativeWebViewProps {
  onMessage?: (m: Message, e: CustomEvent) => void;
  source: { uri?: string; html?: string };
  onLoad?: (event: React.SyntheticEvent<HTMLIFrameElement, Event>) => void;
  onLoadStart?: () => void;
  style?: ViewStyle;
}

export default (props: Props) => {
  const { source, injectedJavaScript, onMessage } = props;
  const { html, uri } = source;
  useEffect(
    () => {
      const handleMessage = (e) => {
        if (!e.detail || !onMessage) return;
        const mouseEvent = e as CustomEvent;
        onMessage(
          {
            nativeEvent: {
              data: mouseEvent.detail,
            },
          },
          e,
        );
      };

      window.addEventListener("message", handleMessage, true);
      return () => window.removeEventListener("message", handleMessage, true);
    },
    [html],
  );

  useEffect(
    () => {
      if (!props.source.html && props.onLoadStart && props.onLoad) {
        props.onLoadStart();
      }
    },
    [uri],
  );

  const renderInjectedHtml = () =>
    useMemo(
      () => {
        return (
          <>
            {getParsedHtml(source.html!)}
            {injectedJavaScript ? <script>{setTimeout(() => eval(injectedJavaScript))}</script> : null}
          </>
        );
      },
      [html, injectedJavaScript],
    );
  if (source.html) return renderInjectedHtml();
  if (source.uri) {
    return <iframe src={source.uri} width="100%" height="100%" onLoad={props.onLoad} />;
  }
  return null;
};
