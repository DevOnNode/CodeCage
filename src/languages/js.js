function getRunCommand(file) {
  return `node /app/${file}`;
}
module.exports = { getRunCommand };
