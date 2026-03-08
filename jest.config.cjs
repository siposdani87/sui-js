module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.spec.json',
    }],
  },
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
      statements: 91,
      branches: 78,
      functions: 88,
      lines: 91
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
