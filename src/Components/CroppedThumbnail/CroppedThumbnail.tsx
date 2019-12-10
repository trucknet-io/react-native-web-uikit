import * as React from "react";
import { Image, ImageProps, ImageURISource, StyleSheet } from "react-native";

interface IOptions {
  fetchFormat?: "auto" | "png";
  crop?: "scale" | "fit" | "crop";
  width?: number;
  height?: number;
}

interface IImageTransformationOptions {
  fetchFormat: string;
  crop: string;
  width?: string;
  height?: string;
}

type KeyofOptions = keyof IOptions;
export type CroppedThumbnailProps = Omit<ImageProps, "source">;

interface IProps extends CroppedThumbnailProps, IOptions {
  accessibilityLabel: string;
  imageId: string;
  uriCloudName: string;
  source?: ImageURISource;
}
class CroppedThumbnail extends React.PureComponent<IProps> {
  public static defaultProps = {
    uriCloudName: "trucknet",
    fetchFormat: "auto",
    crop: "fit",
  };

  private imageTransformationOptions: IImageTransformationOptions = {
    fetchFormat: `f_${this.props.fetchFormat}`,
    crop: `c_${this.props.crop}`,
    width: this.props.width ? `w_${this.props.width}` : undefined,
    height: this.props.height ? `h_${this.props.height}` : undefined,
  };

  public render() {
    const { width, height, imageId, crop, fetchFormat, uriCloudName, ...rest } = this.props;
    return (
      <Image
        {...rest}
        accessible
        style={[styles.imageContainer, { width, height }, rest.style]}
        source={this.getImageSource()}
      />
    );
  }

  private getImageSource = (): ImageURISource => {
    if (this.props.source) return this.props.source;
    const { imageId } = this.props;
    const optionsKeys = Object.keys(this.imageTransformationOptions) as KeyofOptions[];
    const optionsArray: string[] = [];
    for (const key of optionsKeys) {
      const option = this.imageTransformationOptions[key];
      if (option) {
        optionsArray.push(option);
      }
    }
    const uri = `https://res.cloudinary.com/${this.props.uriCloudName}/image/upload/${optionsArray.join(
      ",",
    )}/${imageId}`;
    return { uri };
  };
}

const styles = StyleSheet.create({
  imageContainer: { flexGrow: 1 },
});

export default CroppedThumbnail;
