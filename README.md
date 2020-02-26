# UI Kit

> [UI Kit for react-native and react-native-web](https://react-native-web-uikit.storybook.trucknet.io)

## StoryBook

- `git clone git@github.com:trucknet-io/react-native-web-uikit.git`
- `npm install`
- to add a Storybook story, create a `ComponentName.story.tsx` file in component's folder
- to add a readme name file `README.md` in a component folder
- stories and readme files will be found, loaded and added to storybook automatically

Try to add to stories only required props, rest props will be added withSmartKnobs addon.
[SmartKnobs](https://github.com/storybookjs/addon-smart-knobs) will not automatically create knobs for props whose name is in the `ignoreProps` array
`addDecorator(withSmartKnobs({ ignoreProps: ["gradientStartColor", "gradientEndColor"] }))`

## ThemeProvider

```
import { ThemeProviderWrapper } from "react-native-web-uikit";

<ThemeProviderWrapper>
    {this.props.children}
</ThemeProviderWrapper>
```

```
import {
  withTheme,
  ThemeProps,
  ThemeParamsType,
  ThemeType,
} from "react-native-web-uikit";

type Styles = ReturnType<typeof getStyles>;

interface Props extends ThemeProps<Styles> {}

class Component extends React.PureComponent<Props, State> {
    render() {
        const { styles, theme, fonts, colors, toggleTheme, variables } = this.props;
        return <View style={styles.container} />
    }
}

const getStyles = ({ colors, fonts, variables }: ThemeParamsType) => {
    const { shadow, size, borderRadius, borderWidth } = variables;
    return (
        StyleSheet.create({
            container: {
                backgroundColor: colors.background,
                padding: size.m,
                alignItems: "center",
                justifyContent: "center",
            },
            card, {
                flex: 1,
                borderRadius,
                borderWidth,
                ...shadow,
            }
            text: fonts.BodyRegular,
        });
    )
}


export default withTheme<Props, DefaultProps>(getStyles)(Component);

```

### Web

    - `npm run storybook`

### Mobile

    - `npm run android`

## Usage

```
import { ComponentName } from "react-native-web-uikit"
<ComponentName {...props} />
```

For show Modal Wrap Root Container with `RootWrapper` Component

## Libraries

### Peer Dependencies

    - react
    - react-dom

### Peer Dependencies Mobile

    - react-native
    - react-native-linear-gradient
    - react-native-svg
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
