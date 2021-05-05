module.exports = {
  preset: "jest-playwright-preset",
  testMatch: ["**/playwright/?(*.)+(test).+(ts)"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
  testEnvironmentOptions: {
    "jest-playwright": {
      recordVideo: {
        dir: "videos/",
      },
    },
  },
};


process.env.JEST_PLAYWRIGHT_CONFIG = './jest-playwright.config.js'