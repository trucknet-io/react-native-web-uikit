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
type SizeType = keyof typeof AVATAR_SIZES | number;

interface DefaultProps {
  size: SizeType;
  name: string;
}

interface OwnProps extends CroppedThumbnailProps, DefaultProps {
  accessibilityLabel: string;
  imageId?: string;
  uriCloudName?: string;
  source?: ImageURISource;
}

interface Props extends OwnProps, ThemeProps<Style> {}

const getAvatarSize = (size: SizeType) => (typeof size === "number" ? size : AVATAR_SIZES[size]);

class Avatar extends React.PureComponent<Props> {
  public static defaultProps: DefaultProps = {
    size: "medium",
    name: "?",
  };

  public render() {
    return (
      <View style={[this.props.styles.container, this.props.style]}>
        {this.props.imageId ? this.renderImage() : this.renderNameFirstLetter()}
      </View>
    );
  }

  private renderNameFirstLetter = () => {
    return <Text style={this.props.styles.letter}>{this.props.name.charAt(0)}</Text>;
  };

  private renderImage = () => {
    const imageId = this.props.imageId as string;
    const avatarSize = getAvatarSize(this.props.size);
    return (
      <CroppedThumbnail
        {...this.props}
        imageId={imageId}
        width={avatarSize}
        style={this.props.styles.avatarImageContainer}
      />
    );
  };
}

const getStyle = ({ colors, props: { size } }: ThemeParamsType<OwnProps>) => {
  const avatarSize = getAvatarSize(size);
  return StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      margin: 2,
      backgroundColor: colors.subBackground,
      borderColor: colors.defaultText,
      overflow: "hidden",
      borderWidth: 1,
      height: avatarSize,
      width: avatarSize,
      borderRadius: avatarSize / 2,
    },
    letter: {
      ...Fonts.BodyRegular,
      textTransform: "uppercase",
      color: colors.defaultText,
      fontSize: avatarSize / 2,
    },
    avatarImageContainer: {
      flexGrow: 1,
    },
  });
};

export default withTheme<Props, DefaultProps>(getStyle)(Avatar);
