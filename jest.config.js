module.exports = {
  preset: "jest-playwright-preset",
  testMatch: ["**/playwright/?(*.)+(test).+(ts)"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
};
