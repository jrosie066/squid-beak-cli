module.exports = {
  verbose: true,
  transform: {
    '^.+\\.(ts)?$': 'babel-jest',
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  setupFiles: [
    './config/jest/assetsTransformer.js',
    './config/jest/testSetup.js',
    './config/jest/testShim.js',
  ],
  globals: {
    "ts-jest": {
      "tsConfig": '<rootDir>/tsconfig.json',
      allowJs: true,
    }
  },
  moduleFileExtensions: ['tsx', 'ts', 'js', 'jsx'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/config/jest/assetsTransformer.js',
  },
  testEnvironment: 'node',
};