import { displayName } from "../../../app.json";
import { button } from "@storybook/addon-knobs/react";
export const libName = displayName;
export const setRequiredProp = (name: string) => `${name} (required)`;
export const setOptionalProp = (name: string) => `${name} (optional)`;

export const importInfo = (...rest: Array<string>) => {
  return {
    info: {
      text: "```" + `import { ${rest.join(", ")} } from ${libName}` + "```",
    },
  };
};

export const switchButton = (props: { switchTheme: () => void }): Object => ({
  ...button("switch theme", props.switchTheme),
});

const emailRegex =
  // tslint:disable:max-line-length
  new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

export const switchThemeButton = (switchTheme) => button("switch theme", switchTheme);

export const isEmailInvalid = (email: string) => !emailRegex.test(email);
