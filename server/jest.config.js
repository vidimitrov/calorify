module.exports = {
  testEnvironment: 'node',
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
    "node",
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.(ts|js)?$',
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
  ],
};