function getRunCommand(file) {
  return `python3 /app/${file}`;
}

module.exports = { getRunCommand };
