import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import ColorsGallery, { PureColorsGallery } from "./ColorsGallery";

const stories = storiesOf("Colors|Colors Gallery", module).addParameters({ component: PureColorsGallery });
stories.add("Colors Gallery", () => <ColorsGallery />);

export { stories };
