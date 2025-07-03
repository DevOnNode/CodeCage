function getRunCommand(file) {
  return `sh -c \"mcs -out:/app/main.exe /app/${file} && mono /app/main.exe\"`;
}
module.exports = { getRunCommand };
