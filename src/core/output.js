const logger = require('../utils/logger');

function processOutput(output, timedOut) {
  if (!timedOut) {
    const cleanOutput = output.replace(/^[^a-zA-Zа-яА-Я0-9]+/u, '');
    process.stdout.write(cleanOutput);
  }
  logger.success('Execution completed.');
}

module.exports = { processOutput };
