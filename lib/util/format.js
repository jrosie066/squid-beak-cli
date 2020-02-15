const capitalizeName = (name) => {
  return name.charAt(0).toUpperCase() + name.substring(1);
};

const generateItemName = (name) => {
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