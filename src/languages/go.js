function getRunCommand(file) {
  return `sh -c \"go build -o /app/main /app/${file} && /app/main\"`;
}
module.exports = { getRunCommand };
