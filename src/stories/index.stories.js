import React from "react";
import { Button } from "react-native";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import Buttons from "../Containers/ButtonsContainer";
import { Welcome } from "@storybook/react/demo";

storiesOf("Welcome", module).add("to Storybook", () => <Welcome showApp={linkTo("Button")} />);

storiesOf("Button", module)
  .add("with some emoji", () => (
    <Buttons />
  ));

