function getRunCommand(file) {
  return `php /app/${file}`;
}
module.exports = { getRunCommand };
