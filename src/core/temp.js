const fs = require('fs');
const path = require('path');

function prepareTempDir(dockerfileName, file, originalFileName) {
  const projectTempDir = path.join(__dirname, '../../temp');
  if (!fs.existsSync(projectTempDir)) {
    fs.mkdirSync(projectTempDir);
  }
  const tempDir = fs.mkdtempSync(path.join(projectTempDir, 'codecage-'));
  const tempDockerfile = path.join(tempDir, dockerfileName);
  const tempScript = path.join(tempDir, originalFileName);
  fs.copyFileSync(
    path.join(__dirname, '../../dockerfiles', dockerfileName),
    tempDockerfile,
  );
  fs.copyFileSync(file, tempScript);
  return { tempDir, tempDockerfile, tempScript };
}

function cleanupTempDir(tempDir, tempDockerfile, tempScript) {
  try {
    fs.unlinkSync(tempDockerfile);
    fs.unlinkSync(tempScript);
    fs.rmdirSync(tempDir);
  } catch (e) {}
}

module.exports = { prepareTempDir, cleanupTempDir };
