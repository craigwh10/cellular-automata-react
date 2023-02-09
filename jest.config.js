/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup/jest-setup.ts'],
  testPathIgnorePatterns : [
    "<rootDir>/src/__tests__/setup",
    "<rootDir>/src/__tests__/@types",
    "<rootDir>/src/__tests__/@utils",
    "<rootDir>/example",
    "<rootDir>/example-ssr",
    "<rootDir>/src/utils/useIsomorphicLayoutEffect.tsx"
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss|less)$': 'identity-obj-proxy',
  },
};