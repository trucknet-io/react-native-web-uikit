const path = require("path");
import { Module } from "webpack";

module.exports = ({ config }) => {
  let defaultRules: Module["rules"] = [];

  for (const rule of config.module.rules) {
    if (!rule.test) defaultRules.push(rule);
    if (rule.test && rule.test.toString() !== /\.md$/.toString()) {
      defaultRules.push(rule);
    }
  }

  const moduleRulesChanges = {
    rules: [
      ...defaultRules,
      // https://github.com/react-native-web-community/react-native-web-webview#getting-started
      {
        test: /postMock.html$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, "../src"),
        loader: "awesome-typescript-loader",
      },
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, "../src"),
        loader: "react-docgen-typescript-loader",
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: require.resolve("html-loader"),
          },
          {
            loader: require.resolve("markdown-loader"),
          },
        ],
      },
    ],
  };

  const getDefaultExtensions = () => {
    if (config.resolve.extensions) {
      return config.resolve.extensions;
    }
    return [];
  };

  const resolveChanges = {
    modules: [...(config.resolve.modules || []), path.resolve("./")],
    extensions: [...getDefaultExtensions(), ".ts", ".tsx"],
    alias: {
      "react-native": "react-native-web",
      "react-native-linear-gradient": "react-native-web-linear-gradient",
      "react-native-svg": "react-native-svg-web",
      "react-native-webview": "react-native-web-webview",
      "react-native-modal": "react-native-web",
      "react-native-shimmer-placeholder": "react-content-loader",
      "@storybook/react-native": "@storybook/react",
    },
  };
  if (config) {
    return {
      ...config,
      module: config.module ? { ...config.module, ...moduleRulesChanges } : moduleRulesChanges,
      resolve: config.resolve ? { ...config.resolve, ...resolveChanges } : resolveChanges,
    };
  }
  return {
    module: moduleRulesChanges,
    resolve: resolveChanges,
  };
};
