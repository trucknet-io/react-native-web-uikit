import { displayName } from "../../../app.json";
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

const emailRegex =
  // tslint:disable:max-line-length
  new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

export const isEmailInvalid = (email: string) => !emailRegex.test(email);
