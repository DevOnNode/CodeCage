const fs = require('fs');
const path = require('path');
const pidusage = require('pidusage');

async function collectUsage(pid) {
  try {
    const stat = await pidusage(pid);
    if (!stat.memory || stat.elapsed > 1e7) return null;
    return {
      cpu: stat.cpu,
      memory: Math.round(stat.memory / 1024 / 1024),
      elapsed: stat.elapsed,
      timestamp: new Date().toISOString(),
      source: 'pidusage',
    };
  } catch (e) {
    return null;
  }
}

async function getContainerStats(container) {
  try {
    const stats = await new Promise((resolve, reject) => {
      container.stats({ stream: false }, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
    const cpuDelta =
      stats.cpu_stats.cpu_usage.total_usage -
      stats.precpu_stats.cpu_usage.total_usage;
    const systemDelta =
      stats.cpu_stats.system_cpu_usage - stats.precpu_stats.system_cpu_usage;
    let cpuPercent = null;
    if (systemDelta > 0 && cpuDelta > 0) {
      cpuPercent =
        (cpuDelta / systemDelta) * stats.cpu_stats.online_cpus * 100.0;
    }
    const memoryMB = Math.round(stats.memory_stats.usage / 1024 / 1024);
    if (!memoryMB || (cpuPercent !== null && cpuPercent > 1000)) return null;
    return {
      cpu: cpuPercent,
      memory: memoryMB,
      timestamp: new Date().toISOString(),
      source: 'docker.stats',
    };
  } catch (e) {
    return null;
  }
}

function saveMetrics(metrics, runDir) {
  const file = path.join(runDir, 'metrics.json');
  fs.writeFileSync(file, JSON.stringify(metrics, null, 2), 'utf-8');
}

module.exports = { collectUsage, getContainerStats, saveMetrics };
