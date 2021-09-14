module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  // testTimeout: 20000,
  moduleFileExtensions: ['js', 'json', 'node'],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: 'coverage',
};
