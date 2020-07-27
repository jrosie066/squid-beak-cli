module.exports = {
  testURL: 'http://localhost:8080/',
  verbose: true,
  transform: {
    '^.+\\.(ts|js|html|tsx)$': 'ts-jest',
    '^.+\\.(ts)?$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': './config/jest/assetsTransformer.js',
    
  },
  setupFiles: [
    './config/jest/assetsTransformer.js',
    './config/jest/testSetup.js',
    './config/jest/testShim.js',
  ],
  globals: {
    'ts-jest': {
      'tsConfig': './tsconfig.json',
      allowJs: true,
    }
  },
  moduleFileExtensions: ['tsx', 'ts', 'js'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: ['/node_modules', '/*/*.test.tsx'],
};