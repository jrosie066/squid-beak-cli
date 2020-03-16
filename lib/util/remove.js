const cmdAsync = require('./cmd-async');

/**
 * Run terminal command to remove the given directory
 * @param {string} path 
 */
const remove = async (path) => {
  await cmdAsync(`rm -R ${path}`);
};

module.exports = remove;