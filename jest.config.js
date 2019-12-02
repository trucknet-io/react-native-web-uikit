module.exports = {
  preset: "@testing-library/react-native",
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
    "\\.(ts|tsx)$": "ts-jest",
  },
  testPathIgnorePatterns: ["\\.snap$", "<rootDir>/node_modules/"],
  cacheDirectory: ".jest/cache",
  testMatch: ["<rootDir>/src/**/?(*.)+(spec|test).(js|ts|tsx)"],
  modulePaths: ["<rootDir>"],
};
