const config = require('./config');

function parseLimits(limits, imageTag, runCommand) {
  const merged = { ...config.DEFAULT_LIMITS, ...limits };
  const containerOptions = {
    Image: imageTag,
    Cmd: runCommand.split(' '),
    Tty: false,
    AttachStdout: true,
    AttachStderr: true,
    WorkingDir: '/app',
  };
  if (merged.cpus) {
    containerOptions.CpuPeriod = 100000;
    containerOptions.CpuQuota = Math.floor(merged.cpus * 100000);
  }
  if (merged.cpuset) {
    containerOptions.CpusetCpus = merged.cpuset;
  }
  if (merged.memory) {
    containerOptions.Memory = parseMemory(merged.memory);
  }
  if (merged.memorySwap) {
    containerOptions.MemorySwap = parseMemory(merged.memorySwap);
  }
  if (merged.pidsLimit) {
    containerOptions.PidsLimit = merged.pidsLimit;
  }
  if (merged.readOnly) {
    containerOptions.ReadonlyRootfs = true;
  }
  if (merged.noNetwork) {
    containerOptions.NetworkDisabled = true;
  }
  return containerOptions;
}

function parseMemory(str) {
  if (typeof str === 'number') return str;
  const match = /^([\d.]+)([kKmMgG]?)$/.exec(str);
  if (!match) return parseInt(str, 10);
  const num = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  switch (unit) {
    case 'g':
      return Math.floor(num * 1024 * 1024 * 1024);
    case 'm':
      return Math.floor(num * 1024 * 1024);
    case 'k':
      return Math.floor(num * 1024);
    default:
      return Math.floor(num);
  }
}

module.exports = { parseLimits, parseMemory };
