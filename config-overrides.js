module.exports = function override(config) {
  //do stuff with the webpack config...
  const alias = {
    "react-native": "react-native-web",
    "react-native-linear-gradient": "react-native-web-linear-gradient",
    "react-native-svg": "react-native-svg-web",
  };

  return { ...config, resolve: { ...config.resolve, alias } };
};
