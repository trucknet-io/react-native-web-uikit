import * as React from "react";
import { Image, ImageProps, ImageURISource } from "react-native";

type CropMode = "c_scale" | "c_fit" | "c_crop";

type FetchFormat = "f_auto" | "f_png";

interface IOptions {
  fetch_format?: FetchFormat;
  crop?: CropMode;
  width?: number;
  height?: number;
  rWidth?: number;
  rHeight?: number;
  face?: "g_face";
}

interface IImageTransformationOptions {
  fetch_format?: IOptions["fetch_format"];
  crop?: IOptions["crop"];
  width?: string;
  height?: string;
}

export const croppedThumbnailDefaults: IOptions = {
  fetch_format: "f_auto",
  crop: "c_fit",
};

type KeyofOptions = keyof IOptions;
type CroppedThumbnailProps = Omit<ImageProps, "source">;

interface IProps extends CroppedThumbnailProps {
  accessibilityLabel: string;
  imageId: string;
  options: {
    fetch_format?: "f_auto" | "f_png";
    crop?: "c_scale" | "c_fit" | "c_crop";
    width?: number;
    height?: number;
  };
  cloudName: string;
  source?: ImageURISource;
}
class CroppedThumbnail extends React.PureComponent<IProps> {
  public static defaultProps = {
    options: {},
    cloudName: "trucknet",
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
    const uri = `https://res.cloudinary.com/${this.props.cloudName}/image/upload/${optionsArray.join(",")}/${imageId}`;
    return { uri };
  };
}

export default CroppedThumbnail;
