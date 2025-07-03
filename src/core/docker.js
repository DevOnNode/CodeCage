const Docker = require('dockerode');
const logger = require('../utils/logger');
const path = require('path');
const fs = require('fs');

const docker = new Docker();

async function buildImage(tempDir, dockerfileName, originalFileName, imageTag) {
  logger.info('Building Docker image...');
  await new Promise((resolve, reject) => {
    docker.buildImage(
      {
        context: tempDir,
        src: [dockerfileName, originalFileName],
      },
      { t: imageTag, dockerfile: dockerfileName },
      (err, stream) => {
        if (err) return reject(err);
        stream.on('data', (d) => process.stdout.write(d.toString()));
        stream.on('end', resolve);
        stream.on('error', reject);
      },
    );
  });
}

async function createAndRunContainer(containerOptions, limits) {
  logger.info('Starting container...');
  const container = await docker.createContainer(containerOptions);
  let output = '';
  const stream = await container.attach({
    stream: true,
    stdout: true,
    stderr: true,
  });
  stream.on('data', (chunk) => {
    output += chunk.toString('utf8');
  });
  let timeoutId;
  let timedOut = false;
  if (limits && limits.timeout) {
    timeoutId = setTimeout(async () => {
      timedOut = true;
      logger.error(
        `Execution time exceeded: ${limits.timeout} sec. Container will be stopped.`,
      );
      try {
        await container.stop();
      } catch {}
    }, limits.timeout * 1000);
  }
  await container.start();
  await container.wait();
  if (timeoutId) clearTimeout(timeoutId);
  return { output, container, timedOut };
}

async function copyResultsFromContainer(container) {
  const pathMod = require('path');
  const fsMod = require('fs');
  const logger = require('../utils/logger');
  const getTimestamp = () => {
    const now = new Date();
    return now
      .toISOString()
      .replace(/[-:.TZ]/g, '')
      .slice(0, 14);
  };
  const resultsDir = pathMod.join(__dirname, '../../results');
  if (!fsMod.existsSync(resultsDir)) {
    fsMod.mkdirSync(resultsDir);
  }
  const runDir = pathMod.join(resultsDir, `run-${getTimestamp()}`);
  fsMod.mkdirSync(runDir);
  const tarStream = await container.getArchive({ path: '/app' });
  await new Promise((resolve, reject) => {
    const extract = require('tar').extract({ cwd: runDir });
    tarStream.pipe(extract);
    extract.on('finish', resolve);
    extract.on('error', reject);
  });
  logger.result(
    `All result files saved in: results/${pathMod.basename(runDir)}/`,
  );
}

module.exports = {
  buildImage,
  createAndRunContainer,
  copyResultsFromContainer,
};
