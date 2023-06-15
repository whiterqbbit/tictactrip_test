module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['./dist/'],
  moduleNameMapper: {
    '^test/(.*)': '<rootDir>/test/$1',
  },
  clearMocks: true,
  // setupFilesAfterEnv: ['./test/mocks.ts'],
}
