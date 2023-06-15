module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['./dist/'],
  moduleNameMapper: {
    '^test/(.*)': '<rootDir>/test/$1',
  },
}
