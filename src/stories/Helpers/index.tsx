export const libName = "react-native-web-kit";
export const setRequiredProp = (name: string) => `${name} (required)`;
export const setOptionalProp = (name: string) => `${name} (optional)`;

export const importInfo = (...rest: Array<string>) => {
  return {
    info: {
      text: "```" + `import { ${rest.join(", ")} } from ${libName}` + "```",
    },
  };
};
