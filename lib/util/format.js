const logger = require('./logger');

const capitalizeName = (name) => {
  if (typeof name !== 'string') {
    throw logger.error('The name you provided is not a string');
  }
  return name.charAt(0).toUpperCase() + name.substring(1);
};

const generateItemName = (name) => {
  if (typeof name !== 'string') {
    throw logger.error('The name you provided is not a string');
  }
  if (name.includes('-')) {
    const splitName = name.split('-');
    return splitName.map(name => capitalizeName(name)).join('');
  }
  return capitalizeName(name);
};

module.exports = {
  capitalizeName,
  generateItemName,
};