import { makeDecorator } from "@storybook/addons";

export const addReadmeToStory = makeDecorator({
  wrapper: (storyFn, context) => {
    try {
      const folderPath = context.parameters.fileName.replace(/[A-Za-z.]*$/, "").replace("./src/", "");
      context.parameters["readme"] = {
        // https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import
        sidebar: require(`src/${folderPath}${context.name}.story.md`),
      };
    } catch (e) {}
    return storyFn(context);
  },
});
