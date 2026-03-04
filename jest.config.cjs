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
      statements: 88,
      branches: 73,
      functions: 85,
      lines: 88
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
