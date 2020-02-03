import * as React from "react";
import { StyleSheet, Text, View, ImageURISource } from "react-native";
import CroppedThumbnail, { CroppedThumbnailProps } from "src/Components/CroppedThumbnail";
import Fonts from "src/Themes/Fonts";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

const AVATAR_SIZES = {
  small: 28,
  medium: 36,
  large: 44,
};

type Style = ReturnType<typeof getStyle>;

interface DefaultProps {
  size: keyof typeof AVATAR_SIZES | number;
  name: string;
}

interface Props extends CroppedThumbnailProps, DefaultProps, ThemeProps<Style> {
  accessibilityLabel: string;
  imageId?: string;
  uriCloudName?: string;
  source?: ImageURISource;
}

class Avatar extends React.PureComponent<Props> {
  public static defaultProps: DefaultProps = {
    size: "medium",
    name: "?",
  };

  public render() {
    const avatarStyles = this.getAvatarStyles();
    return (
      <View style={[avatarStyles, this.props.styles.container, this.props.style]}>
        {this.props.imageId ? this.renderImage() : this.renderNameFirstLetter()}
      </View>
    );
  }

  private renderNameFirstLetter = () => {
    const avatarSize = this.getAvatarSize();
    return <Text style={[this.props.styles.letter, { fontSize: avatarSize / 2 }]}>{this.props.name.charAt(0)}</Text>;
  };

  private renderImage = () => {
    const imageId = this.props.imageId as string;
    const avatarSize = this.getAvatarSize();
    return (
      <CroppedThumbnail
        {...this.props}
        imageId={imageId}
        width={avatarSize}
        style={this.props.styles.avatarImageContainer}
      />
    );
  };

  private getAvatarSize = () => {
    if (typeof this.props.size === "number") {
      return this.props.size;
    }
    return AVATAR_SIZES[this.props.size];
  };

  private getAvatarStyles = () => {
    const avatarSize = this.getAvatarSize();
    return {
      height: avatarSize,
      width: avatarSize,
      borderRadius: avatarSize / 2,
    };
  };
}

const getStyle = ({ colors }: ThemeParamsType) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      margin: 2,
      backgroundColor: colors.subBackground,
      borderColor: colors.defaultText,
      overflow: "hidden",
      borderWidth: 1,
    },
    letter: {
      ...Fonts.BodyRegular,
      textTransform: "uppercase",
      color: colors.defaultText,
    },
    avatarImageContainer: {
      flexGrow: 1,
    },
  });

export default withTheme<Props, DefaultProps>(getStyle)(Avatar);
