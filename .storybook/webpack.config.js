const path = require('path');

module.exports = async ({ config }) => {
    const resolveChanges = {
        extensions: [...config.resolve.extensions, '.ts', '.tsx'],
        alias: {
            "react-native": "react-native-web",
            "react-native-linear-gradient": "react-native-web-linear-gradient",
            "react-router-native": "react-router-dom",
        }
    };
    return { ...config, resolve: { ...config.resolve, ...resolveChanges } };
};