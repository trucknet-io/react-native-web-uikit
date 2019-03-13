module.exports = function override(config) {
    //do stuff with the webpack config...
    const alias = {
        "react-native": "react-native-web",
        "react-native-linear-gradient": "react-native-web-linear-gradient",
        "react-router-native": "react-router-dom",

    };

    return { ...config, resolve: { ...config.resolve, alias } };
}