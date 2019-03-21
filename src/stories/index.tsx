import React from "react";
import { storiesOf } from "@storybook/react";
import { linkTo } from "@storybook/addon-links";
import * as Buttons from "../Components/Buttons";
import { Welcome } from "@storybook/react/demo";
import Colors from "../Themes/Colors";
import { withKnobs, text, color } from "@storybook/addon-knobs";
import IconsContainer from "../Containers/IconsContainer";
import ModalsContainer from "../Containers/ModalsContainer";

const stories = storiesOf("Welcome", module).add("to Storybook", () => <Welcome showApp={linkTo("Button")} />);

stories.addDecorator(withKnobs);

stories.add("Buttons", () => (
  <Buttons.GradientButton
    label={text("title", "button")}
    gradientStartColor={color("gradientStartColor", Colors.themeGradient.gradientColor1)}
    gradientEndColor={color("gradientEndColor", Colors.themeGradient.gradientColor2)}
  />
));

stories.add("Icons", () => <IconsContainer />);

stories.add("Modals", () => <ModalsContainer />);
