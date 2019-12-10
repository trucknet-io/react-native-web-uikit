import * as React from "react";
import { StyleSheet, Text, View, ImageURISource } from "react-native";
import CroppedThumbnail, { CroppedThumbnailProps } from "src/Components/CroppedThumbnail";
import Colors from "src/Themes/Colors";
import Fonts from "src/Themes/Fonts";

const AVATAR_SIZES = {
  small: 28,
  medium: 36,
  large: 44,
};

interface IProps extends CroppedThumbnailProps {
  size: keyof typeof AVATAR_SIZES | number;
  accessibilityLabel: string;
  name: string;
  imageId?: string;
  uriCloudName?: string;
  source?: ImageURISource;
}

class Avatar extends React.PureComponent<IProps> {
  public static defaultProps = {
    size: "medium",
    name: "?",
  };

  public render() {
    const avatarStyles = this.getAvatarStyles();
    return (
      <View style={[avatarStyles, styles.container, this.props.style]}>
        {this.props.imageId ? this.renderImage() : this.renderNameFirstLetter()}
      </View>
    );
  }

  private renderNameFirstLetter = () => {
    const avatarSize = this.getAvatarSize();
    return <Text style={[styles.letter, { fontSize: avatarSize / 2 }]}>{this.props.name.charAt(0)}</Text>;
  };

  private renderImage = () => {
    const imageId = this.props.imageId as string;
    const avatarSize = this.getAvatarSize();
    return (
      <CroppedThumbnail
        {...this.props}
        imageId={imageId}
        options={{
          crop: "c_fit",
          width: avatarSize,
        }}
        style={styles.avatarImageContainer}
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

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    backgroundColor: Colors.subBackground,
    borderColor: Colors.defaultText,
    overflow: "hidden",
    borderWidth: 1,
  },
  letter: {
    ...Fonts.style.ThinTitle,
    textTransform: "uppercase",
    color: Colors.defaultText,
  },
  avatarImageContainer: {
    height: "100%",
    width: "100%",
  },
});

export default Avatar;
