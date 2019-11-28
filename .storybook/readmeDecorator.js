import { makeDecorator } from "@storybook/addons";
export const addReadmeToStory = makeDecorator({
  wrapper: (storyFn, context) => {
    console.log(context);
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
