import * as React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import CloudinaryImage from "src/Components/CloudinaryImage";
import Colors from "src/Themes/Colors";
import Fonts from "src/Themes/Fonts";

const AVATAR_SIZES = {
  small: 28,
  medium: 36,
  large: 44,
};

interface IProps {
  size: keyof typeof AVATAR_SIZES | number;
  accessibilityLabel: string;
  name: string;
  imageId?: string;
  cloudinaryCloudName?: string;
  styles?: ViewStyle;
}

class Avatar extends React.PureComponent<IProps> {
  public static defaultProps = {
    size: "medium",
    name: "?",
  };

  public render() {
    const avatarStyles = this.getAvatarStyles();
    return (
      <View style={[avatarStyles, styles.container, this.props.styles]}>
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
      <CloudinaryImage
        imageId={imageId}
        accessibilityLabel={this.props.accessibilityLabel}
        options={{
          crop: "c_crop",
          face: "g_face",
          rHeight: avatarSize,
        }}
        style={styles.avatarImageContainer}
        cloudinaryCloudName={this.props.cloudinaryCloudName}
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
  },
  avatarImageContainer: {
    height: "100%",
    width: "100%",
  },
});

export default Avatar;
