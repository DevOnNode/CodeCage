function getRunCommand(file) {
  return `ruby /app/${file}`;
}
module.exports = { getRunCommand };
