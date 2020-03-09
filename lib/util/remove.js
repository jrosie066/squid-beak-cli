const cmdAsync = require('./cmd-async');

const remove = async (path) => {
  await cmdAsync(`rm -R ${path}`);
};

module.exports = remove;