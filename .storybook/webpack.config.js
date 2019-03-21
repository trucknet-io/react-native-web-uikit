module.exports = async ({ config }) => {
    const resolveChanges = {
        extensions: [...config.resolve.extensions, '.ts', '.tsx'],
        alias: {
            "react-native": "react-native-web",
            "react-native-linear-gradient": "react-native-web-linear-gradient",
            "react-router-native": "react-router-dom",
            'react-native-svg': 'react-native-svg-web',
        }
    };
    return { ...config, resolve: { ...config.resolve, ...resolveChanges } };
};