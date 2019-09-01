# UI Kit

> UI Kit for react-native and react-native-web apps with modal and drawer

[UIKit Storybook Link](https://react-native-web-uikit.storybook.trucknet.io)

![Modal/Drawer](docs/uikit_storybook.gif)

## StoryBook

    - git clone git@github.com:trucknet-io/react-native-web-uikit.git
    - npm install

### Web

    - npm run storybook

### Mobile

    - npm run android

## Usage

```
import { ComponentName } from "react-native-web-uikit"
<ComponentName {...props} />
```

## ThemeProvider

```
import { ThemeProvider } from "react-native-web-uikit";

<ThemeProvider
        value={{
          colorThemeName: this.state.colorThemeName,
        }}>
    <ThemedComponents />
</ThemeProvider>
```

```
import { withTheme, colorTheme, getThemeFont, UikitComponentWithTheme, SetStyleParamsType } from "react-native-web-uikit";

type Style = ReturnType<typeof setStyle>;
type Props = {
  style: Style;
  colorThemeName: ColorThemeNameType
}

class Component extends React.PureComponent<Props, State> {
    render() {
        const { style, colorThemeName } = this.props;
        const getFont = getThemeFont(colorThemeName)
        return (
            <View styles={style.container}>
                <UikitComponentWithTheme theme={colorThemeName} />
                 <Text style={{...getFont("SubTitle"), color: colorTheme[colorThemeName].primaryText}}>
                    Some Text
                </Text>
            </View>
            );
        )
    }
}

const setStyle = ({ color, getFont }: SetStyleParamsType) =>
    StyleSheet.create({
        container: {
            backgroundColor: color.background
        },
        text: getFont("BodyRegular"),
    });

export default withTheme<Props, Style>(setStyle)(Component);

```
For show Modal Wrap Root Container with `RootWrapper` Component

## webpack config

*web apps only*

change your `webpack.config.js`
```
const { setUikitWebpackSetting } = require("react-native-web-uikit");

module.exports = setUikitWebpackSetting(config?: webpackConfig);

```

## Libraries

### Peer Dependencies

    - react
    - react-dom

### Peer Dependencies Mobile

    - react-native
    - react-native-linear-gradient
    - react-native-svg
    - react-native-vector-icons
    - react-native-modal
    - react-native-webview
    - react-content-loader
    - react-native-shimmer-placeholder

### Peer Dependencies Web

    - react-art
    - react-native-web
    - react-native-web-linear-gradient
    - react-native-svg-web
    - react-native-web-webview,
    - modal-react-native-web,
    - react-content-loader,

