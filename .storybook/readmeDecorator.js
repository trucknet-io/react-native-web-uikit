import React from "react";
import { makeDecorator } from "@storybook/addons";
import { View, Text } from "react-native";

export const addReadmeToStory = makeDecorator({
  wrapper: (storyFn, context) => {
    try {
      const folderPath = context.parameters.fileName.replace(/[A-Za-z.]*$/, "").replace("./src/", "");
      context.parameters["readme"] = {
        sidebar: require(`src/${folderPath}${context.name}.story.md`),
      };
    } catch (e) {
      console.log(context.name + " doesn't have readme yet");
    }
    return storyFn(context);
  },
});
