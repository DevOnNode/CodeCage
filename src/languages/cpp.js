function getRunCommand(file) {
  return `sh -c \"g++ /app/${file} -o /app/main && /app/main\"`;
}
module.exports = { getRunCommand };
