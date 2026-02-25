/** @type {import('jest').Config} */
module.exports = {
  rootDir: '.',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },

  testMatch: [
    '<rootDir>/__tests__/**/*.(ts|tsx)',
    '<rootDir>/src/**/*.(spec|test).(ts|tsx)',
  ],

  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],

  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
  },

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  collectCoverage: true,
  coverageDirectory: 'coverage',
};
