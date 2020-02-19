import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import ColorsGallery, { ColorsGalleryComponent } from "./ColorsGallery";

const stories = storiesOf("Colors|Colors Gallery", module).addParameters({ component: ColorsGalleryComponent });
stories.add("Colors Gallery", () => <ColorsGallery />);

export { stories };
