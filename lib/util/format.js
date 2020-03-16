/**
 * Captialize given string
 * @param {string} name name to capitalize
 */
const capitalizeName = (name) => {
  if (typeof name !== 'string') {
    throw 'The name you provided is not a string';
  }
  return name.charAt(0).toUpperCase() + name.substring(1);
};

/**
 * Format the given name to be used for any of the elements. Given a name separated by dashes
 * it will format it to Pascal Casee
 * @param {string} name name to format
 */
const generateItemName = (name) => {
  if (typeof name !== 'string') {
    throw 'The name you provided is not a string';
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