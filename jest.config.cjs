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
  reporters: ['default',  ['jest-sonar', {
    outputDirectory: 'reports',
    outputName: 'test-reporter.xml',
    reportedFilePath: 'absolute'
}]],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  silent: true,
  forceExit: true
};
