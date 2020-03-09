module.exports = {
  verbose: true,
  transform: {
    '^.+\\.(js)?$': 'babel-jest',
    // '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  setupFiles: [
    './config/jest/assetsTransformer.js',
    // './config/jest/testSetup.js',
    './config/jest/testShim.js',
    './config/jest/mock/fs.js'
  ],
  moduleFileExtensions: ['tsx', 'ts', 'js', 'jsx'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/config/jest/assetsTransformer.js',
  },
  moduleDirectories: [
    'node_modules'
  ],
};