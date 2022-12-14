module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcovonly'],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!**/node_modules/**"
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  silent: true
};
