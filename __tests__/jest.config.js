module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/../src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/setup.js"],
  collectCoverage: true,
  collectCoverageFrom: ["../src/**/*.{ts,tsx}", "!../src/**/*.d.ts", "!../src/types.ts"],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov"],
  verbose: true,
}
