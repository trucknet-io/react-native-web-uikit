import { normalize } from "./FontHelper";

const type = {
  base: "System",
  bold: "Avenir-Black",
  emphasis: "HelveticaNeue-Italic",
};

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5,
};

const style = {
  h1: {
    fontFamily: type.bold,
    fontSize: size.h1,
  },
  h2: {
    fontWeight: "bold",
    fontSize: size.h2,
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3,
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4,
    fontWeight: "bold",
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5,
    fontWeight: "bold",
  },
  input: {
    fontFamily: type.base,
    fontSize: size.input,
    fontWeight: "bold",
  },
  context: {
    fontFamily: type.base,
    fontSize: size.medium,
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular,
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium,
  },
  small: {
    fontFamily: type.base,
    fontSize: size.small,
  },
  title: {
    fontSize: 26,
    fontFamily: "Assistant-SemiBold",
  },
  h1White: {
    fontSize: 36,
    fontFamily: "Assistant",
    fontWeight: "600",
    fontStyle: "normal",
    textAlign: "center",
  },
  // styleguide font types
  Headline4: {
    fontFamily: "Assistant-Regular",
    fontSize: normalize(56),
  },
  Headline3: {
    fontFamily: "Assistant-Regular",
    fontSize: normalize(45),
  },
  Headline2: {
    fontFamily: "Assistant-SemiBold",
    fontSize: normalize(34),
  },
  Title: {
    fontFamily: "Roboto-Medium",
    fontSize: normalize(20),
  },
  LargeTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: normalize(24),
  },
  ThinTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: normalize(20),
  },
  SubTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: normalize(16),
  },
  SubTitle2: {
    fontFamily: "Roboto-Regular",
    fontSize: normalize(16),
  },
  Headline1: {
    fontFamily: "Assistant-Regular",
    fontSize: normalize(24),
  },
  Subheading: {
    fontFamily: "Roboto-Regular",
    fontSize: normalize(12),
  },
  Body: {
    fontFamily: "Roboto-Regular",
    fontSize: normalize(16),
  },
  BodyStable: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  Button: {
    fontFamily: "Roboto-Medium",
    fontSize: normalize(14),
  },
  ButtonSmall: {
    fontFamily: "Roboto-Medium",
    fontSize: normalize(10),
  },
  BodySmall: {
    fontFamily: "Roboto-Regular",
    fontSize: normalize(12),
  },
  SubheadingSmall: {
    fontFamily: "Roboto-Regular",
    fontSize: normalize(10),
  },
  BodySmallThick: {
    fontFamily: "Roboto-Medium",
    fontSize: normalize(12),
  },
  BodyRegular: {
    fontFamily: "Roboto-Regular",
    fontSize: normalize(14),
  },
  BodyRegularZoom: {
    fontFamily: "Roboto-Regular",
    fontSize: normalize(15),
  },
  Caption: {
    fontFamily: "Roboto-Light",
    fontSize: normalize(12),
  },
  STitle: {
    fontFamily: "Roboto-Medium",
    fontSize: normalize(16),
  },
  MTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: normalize(18),
  },
};

export default {
  type,
  size,
  style,
};
