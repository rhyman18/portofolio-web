/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src/scripts'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  coverageDirectory: '<rootDir>/coverage',
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 60,
      functions: 85,
      lines: 80,
    },
  },
  collectCoverageFrom: [
    'src/scripts/**/*.{js,jsx}',
    '!src/scripts/**/*.{spec,test}.js',
    '!src/scripts/**/index.js',
    '!src/scripts/lazysizes.js',
    '!src/scripts/bglazy.js',
  ],
};
