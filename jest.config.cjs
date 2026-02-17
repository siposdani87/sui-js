module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcovonly', 'text', 'text-summary'],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/*.spec.ts"
  ],

  // Coverage thresholds - builds will fail if coverage drops below these values
  coverageThreshold: {
    global: {
      statements: 65,
      branches: 52,
      functions: 59,
      lines: 65
    }
  },

  reporters: ['default',  ['jest-sonar', {
    outputDirectory: 'reports',
    outputName: 'test-reporter.xml',
    reportedFilePath: 'absolute'
  }]],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  silent: true,
  forceExit: true
};
