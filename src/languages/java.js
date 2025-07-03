function getRunCommand(file) {
  const className = file.replace(/\.java$/, '');
  return `sh -c \"javac /app/${file} && java -cp /app ${className}\"`;
}
module.exports = { getRunCommand };
