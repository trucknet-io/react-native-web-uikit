const path = require("path");
import setUikitWebpackSetting from "../src/Components/setUikitWebpackSetting";

module.exports = ({ config }) => {
  config.resolve.modules = [...(config.resolve.modules || []), path.resolve("./")];
  return setUikitWebpackSetting(config);
};
