module.exports = {
  preset: "@testing-library/react-native",
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
    "\\.(ts|tsx)$": "ts-jest",
  },
  testPathIgnorePatterns: ["\\.snap$", "<rootDir>/node_modules/"],
  cacheDirectory: ".jest/cache",
  coverageReporters: ["json-summary", "text", "html"],
  collectCoverageFrom: ["src/**/*.ts", "src/**/*.tsx"],
  testMatch: ["<rootDir>/src/**/__tests__/**/*.(js|ts|tsx)", "<rootDir>/src/**/?(*.)+(spec|test).(js|ts|tsx)"],
  modulePaths: ["<rootDir>"],
  transformIgnorePatterns: ["node_modules/(?!react-native)/"],
  moduleNameMapper: {
    "react-native-svg": "react-native-svg-web",
  },
};
