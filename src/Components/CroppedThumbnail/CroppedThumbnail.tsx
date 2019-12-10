import * as React from "react";
import { Image, ImageProps, ImageURISource } from "react-native";

type CropMode = "c_scale" | "c_fit" | "c_crop";

type FetchFormat = "f_auto" | "f_png";

interface IOptions {
  fetchFormat?: FetchFormat;
  crop?: CropMode;
  width?: number;
  height?: number;
}

interface IImageTransformationOptions {
  fetchFormat?: IOptions["fetchFormat"];
  crop?: IOptions["crop"];
  width?: string;
  height?: string;
}

export const croppedThumbnailDefaults: IOptions = {
  fetchFormat: "f_auto",
  crop: "c_fit",
};

type KeyofOptions = keyof IOptions;
export type CroppedThumbnailProps = Omit<ImageProps, "source">;

interface IProps extends CroppedThumbnailProps {
  accessibilityLabel: string;
  imageId: string;
  options: {
    fetch_format?: "f_auto" | "f_png";
    crop?: "c_scale" | "c_fit" | "c_crop";
    width?: number;
    height?: number;
  };
  uriCloudName: string;
  source?: ImageURISource;
}
class CroppedThumbnail extends React.PureComponent<IProps> {
  public static defaultProps = {
    options: {},
    uriCloudName: "trucknet",
  };
  private imageTransformationOptions: IImageTransformationOptions = {
    ...croppedThumbnailDefaults,
    ...this.props.options,
    width: this.props.options.width ? `w_${this.props.options.width}` : undefined,
    height: this.props.options.height ? `h_${this.props.options.height}` : undefined,
  };

  public render() {
    const { width, height } = this.props.options;
    return (
      <Image
        {...this.props}
        accessible
        accessibilityLabel={this.props.accessibilityLabel}
        style={[{ width, height }, this.props.style]}
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

export default CroppedThumbnail;
