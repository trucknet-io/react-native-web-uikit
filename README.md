# trucknet-boilerplate-typescript-react

> Boilerplate for a new react native project on Typescript!

## Getting started

To start your new React Native project!

1. `git clone` this repository
2. `rm -rf .git`
3. `git init`
4. `git remote add origin`
5. `git flow init`
6. Edit package.json to change name (upper-snake-case), description and git repository of the project
7. Edit app.json to change name (UpperCamelCase) and display name (Human Readable) of the project
8. Run `npx react-native eject` to build android and ios folders
9. Replace `icon.png` in the root of the project and run `npx app-icon generate`
10. Git commit, add and push your new app 😎

## Libraries

### Core libraries

- React 16.6.3
- Typescript 3.2
- React native 0.57.8

### Dev utils

- Jest
- TSLint with [Trucknet's config](https://github.com/trucknet-io/tslint-config-trucknet-io)
- Prettier with [Trucknet's config](https://github.com/trucknet-io/prettier-config-trucknet-io)
- [Trucknet's commit utils](https://github.com/trucknet-io/trucknet-commit)

## Development environment 💻

All the environment set up instructions are given for **Mac OS** or **Ubuntu 18.04**.

### VS Code

[Visual Studio Code](https://code.visualstudio.com/) is the code editor you will fall in love with!

[Download](https://code.visualstudio.com/#alt-downloads) it from the website and install.

After installation open Extensions tab and install following extensions:

- GitLens
- ESLint
- TSLint
- Prettier
- Flow

### [Optional] oh-my-zsh

[Oh my zsh](https://github.com/robbyrussell/oh-my-zsh) is a cool configuration of zsh (improved shell), which makes work in terminal more comfortable.

- **ubuntu only** `sudo apt install zsh`
- **ubuntu only** `chsh -s $(which zsh)`
- `sh -c "\$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`

### Git Flow

[Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/) is a way to organize branches of the git repository

- **ubuntu only** `sudo apt install git-flow`
- **mac only** `brew install git-flow-avh` (Install [Homebrew](https://brew.sh) first, if not installed)

After you will clone your working repository, you need to run

`git checkout master`
`git flow init`

for the first time to init Git flow inside the local repository.

### Node and NPM

[NVM](https://github.com/creationix/nvm) is a node version manager. A tool to install and keep at the same time several versions of nodejs on your computer.

- `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
- **oh-my-zsh only** add `nvm` to `plugins` section of `~/.zshrc`
- `nvm install` (inside this folder)
- `npm update -g npm`

### iOS (Mac only)

- Just install `XCode` from Mac AppStore and open it once

### Android

- **ubuntu only** `sudo apt install openjdk-8-jdk`
- **mac only** Install [JDK (Java SE Development Kit) 8u192](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- Download [Android Studio](https://developer.android.com/studio/)
  - **ubuntu only**:
    - `sudo apt install unzip libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386`
    - `sudo unzip path-to-android-studio-linux.zip -d /opt`
    - `rm path-to-android-studio-linux.zip`
    - `sudo ln -s /opt/android-studio/bin/studio.sh /usr/local/bin/android-studio`
    - `android-studio` will launch Android Studio. The wizard will be started, exit it (when exiting choose to launch wizard next time).
    - Inside Android studio welcome window use `Configure -> Create desktop entry` and check `Create the entry for all users` to create an application launcher in system menu
    - Exit Android studio and launch it from system menu
- Android SDK
  - Launch Android studio
  - If it is the first time of running Android Studio, you will see a setup wizard. Install everything it needs.
  - Open android folder inside this folder in Android Studio
  - Launch AVD Manager (icon with smartphone and android in right top corner)
  - Create a new virtual device for development using x86 image (in recommended tab)
  - Launch the virtual device
