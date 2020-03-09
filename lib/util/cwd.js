const path = require('path');

const getCWD = (filePath) => {
  return path.resolve(process.cwd(), filePath);
};

module.exports = getCWD;