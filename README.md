# UI Kit

> UI Kit for react-native and react-native-web apps with modal and drawer

[UIKit Storybook Link](https://react-native-web-uikit.storybook.trucknet.io)

![Modal/Drawer](docs/uikit_storybook.gif)

## StoryBook

- git clone git@github.com:trucknet-io/react-native-web-uikit.git
- npm install
- for adding story name file `ComponentName.story.tsx` in component folder
- for adding readme name file `ComponentName.story.md` in component folder
- stories and readme files will be find and load with script

Try add to stories only required props, rest props will be added withSmartKnobs addon.
SmartKnobs will not automatically create knobs for props whose name is in this array
`addDecorator(withSmartKnobs({ ignoreProps: ["gradientStartColor", "gradientEndColor"] }))`

### Web

    - npm run storybook

### Mobile

    - npm run android

## Usage

```
import { ComponentName } from "react-native-web-uikit"
<ComponentName {...props} />
```

For show Modal Wrap Root Container with `RootWrapper` Component

## webpack config

_web apps only_

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
