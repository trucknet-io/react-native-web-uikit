import * as React from "react";
import { Image, ImageProps } from "react-native";

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
  rWidth?: string;
  rHeight?: string;
  face?: "g_face";
}

export const cloudinaryDefaults: IOptions = {
  fetch_format: "f_auto",
  crop: "c_fit",
};

type KeyofOptions = keyof IOptions;
type CloudinaryImageProps = Omit<ImageProps, "source">;

interface IProps extends CloudinaryImageProps {
  accessibilityLabel: string;
  imageId: string;
  options: {
    fetch_format?: "f_auto" | "f_png";
    crop?: "c_scale" | "c_fit" | "c_crop";
    width?: number;
    height?: number;
    face?: "g_face";
    rWidth?: number;
    rHeight?: number;
  };
  cloudinaryCloudName: string;
}
class CloudinaryImage extends React.PureComponent<IProps> {
  public static defaultProps = {
    options: {},
    cloudinaryCloudName: "trucknet",
  };
  private imageTransformationOptions: IImageTransformationOptions = {
    ...cloudinaryDefaults,
    ...this.props.options,
    width: this.props.options.width ? `w_${this.props.options.width}` : undefined,
    height: this.props.options.height ? `h_${this.props.options.height}` : undefined,
    rWidth: this.props.options.rWidth ? `r_max/w_${this.props.options.rWidth}` : undefined,
    rHeight: this.props.options.rHeight ? `r_max/h_${this.props.options.rHeight}` : undefined,
  };

  public render() {
    const { width, height } = this.props.options;
    return (
      <Image
        {...this.props}
        accessible
        accessibilityLabel={this.props.accessibilityLabel}
        style={[{ width, height }, this.props.style]}
        source={{
          uri: this.getCloudinaryImageUri(),
        }}
      />
    );
  }

  private getCloudinaryImageUri = () => {
    const { imageId } = this.props;

    const optionsKeys = Object.keys(this.imageTransformationOptions) as KeyofOptions[];
    const optionsArray: string[] = [];
    for (const key of optionsKeys) {
      const option = this.imageTransformationOptions[key];
      if (option) {
        optionsArray.push(option);
      }
    }
    return `https://res.cloudinary.com/${this.props.cloudinaryCloudName}/image/upload/${optionsArray.join(
      ",",
    )}/${imageId}`;
  };
}

export default CloudinaryImage;
