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

*themed components (Form, LoginForm, SignatureModal) will work only inside ThemeProviderWrapper in your app*

```
import { ThemeProviderWrapper } from "react-native-web-uikit";

<ThemeProviderWrapper>
    <ThemedComponents />
</ThemeProviderWrapper>
```

```
import { withTheme, UikitComponentWithTheme, SetStyleParamsType, ThemeProps } from "react-native-web-uikit";

type Style = ReturnType<typeof setStyle>;

interface Props extends ThemeProps<Style> {}

class Component extends React.PureComponent<Props, State> {
    render() {
        const { style, theme, font, color, switchTheme, variables } = this.props;
        return (
                <View style={style.container}>
                    <SwitchTheme currentThemeName={theme} switchTheme={switchTheme}/>
                    <View style={style.card}>
                        <UikitComponentWithTheme />
                        <!-- uikit component theme will change depends on app theme change -->
                    </View>
                    <Text style={{...font.SubTitle, color: color.primaryText}}>
                        Some Text
                    </Text>
                    <Text style={style.text}>Some Text</Text>
                </View>
            );
        )
    }
}

const setStyle = ({ color, font, variables }: SetStyleParamsType) => {
    const { shadow, indent, size, borderRadius, borderWidth, window, isTablet, isLandscape } = variables;
    // window sizes, isLandscape change on dimensions change
    return (
        StyleSheet.create({
            container: {
                backgroundColor: color.background,
                padding: isTablet ? indent.xl : indent.l,
                width: isLandscape ? window.width / 2 : window.width,
                height: size.xxxl,
                alignItems: "center",
                justifyContent: "center",
            },
            card, {
                flex: 1,
                borderRadius,
                borderWidth,
                ...shadow,
            }
            text: font.BodyRegular,
        });
    )
}

export default withTheme<Props, Style>(setStyle)(Component);

```

 - add defaultProps if you need
  
```
type DefaultProps = typeof LoginFormContainer.defaultProps;

export default withTheme<Props, Style, DefaultProps>(setStyle)(Component);
```

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

