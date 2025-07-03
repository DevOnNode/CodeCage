const logger = require('../utils/logger');
const { prepareTempDir, cleanupTempDir } = require('./temp');
const {
  buildImage,
  createAndRunContainer,
  copyResultsFromContainer,
} = require('./docker');
const { parseLimits } = require('./limits');
const { processOutput } = require('./output');
const languages = require('../languages');
const path = require('path');
const {
  collectUsage,
  getContainerStats,
  saveMetrics,
} = require('../utils/metrics');
const fs = require('fs');

async function runCode(lang, file, collectFiles, limits = {}) {
  logger.info(`Running code: language = ${lang}, file = ${file}`);

  if (!languages[lang]) {
    logger.error(`Language ${lang} is not supported.`);
    return;
  }

  const originalFileName = path.basename(file);
  const dockerfileName = `Dockerfile.${lang}`;

  const { tempDir, tempDockerfile, tempScript } = prepareTempDir(
    dockerfileName,
    file,
    originalFileName,
  );

  const imageTag = `codecage_${lang}_image`;
  await buildImage(tempDir, dockerfileName, originalFileName, imageTag);

  let runCommand;
  if (typeof languages[lang].getRunCommand === 'function') {
    runCommand = languages[lang].getRunCommand(originalFileName);
  } else if (typeof languages[lang].getPythonRunCommand === 'function') {
    runCommand = languages[lang].getPythonRunCommand(originalFileName);
  } else {
    logger.error(`No run function found for language ${lang}`);
    return;
  }

  const containerOptions = parseLimits(limits, imageTag, runCommand);

  const startTime = Date.now();
  let usage = null;
  let status = 'success';
  let error = null;

  try {
    const { output, container, timedOut } = await createAndRunContainer(
      containerOptions,
      limits,
    );

    usage = await getContainerStats(container);
    if (!usage) {
      const inspect = await container.inspect();
      const pid = inspect.State.Pid;
      usage = await collectUsage(pid);
    }

    let runDir = null;
    if (collectFiles) {
      const resultsDir = path.join(__dirname, '../../results');
      const before = fs.readdirSync(resultsDir);
      await copyResultsFromContainer(container);
      const after = fs.readdirSync(resultsDir);
      const newDirs = after.filter((d) => !before.includes(d));
      runDir = path.join(resultsDir, newDirs[0]);
    } else {
      processOutput(output, timedOut);
      runDir = tempDir;
    }

    const endTime = Date.now();
    let usage_reason = null;
    if (!usage) {
      if (process.platform === 'win32') {
        usage_reason = 'not supported on Windows (Docker Desktop/WSL2)';
      } else {
        usage_reason = 'container finished too fast or stats unavailable';
      }
    }
    const metrics = {
      timestamp: new Date(startTime).toISOString(),
      lang,
      file,
      duration_ms: endTime - startTime,
      usage,
      usage_reason,
      status: timedOut ? 'timeout' : status,
      error,
      limits,
    };
    saveMetrics(metrics, runDir);
  } catch (e) {
    status = 'error';
    error = e.message;
    const endTime = Date.now();
    const metrics = {
      timestamp: new Date(startTime).toISOString(),
      lang,
      file,
      duration_ms: endTime - startTime,
      usage,
      usage_reason:
        process.platform === 'win32'
          ? 'not supported on Windows (Docker Desktop/WSL2)'
          : 'container finished too fast or stats unavailable',
      status,
      error,
      limits,
    };
    saveMetrics(metrics, tempDir);
    logger.error(`Run error: ${e.message}`);
  } finally {
    cleanupTempDir(tempDir, tempDockerfile, tempScript);
  }
}

module.exports = { runCode };
