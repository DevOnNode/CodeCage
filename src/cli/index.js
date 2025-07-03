#!/usr/bin/env node
const { program } = require('commander');
const { runCode } = require('../core/runner');
const fs = require('fs');
const path = require('path');

program
  .command('run')
  .requiredOption('--lang <language>', 'Programming language')
  .requiredOption('--file <path>', 'Path to code file')
  .option('--collect-files', 'Save all result files from the container')
  .option('--cpus <cpus>', 'CPU limit (e.g., 1.5)', parseFloat)
  .option('--cpuset <cpus>', 'List of CPU cores (e.g., 0,1)')
  .option('--memory <memory>', 'Memory limit (e.g., 128m)')
  .option('--memory-swap <memory>', 'Memory+swap limit (e.g., 256m)')
  .option('--timeout <seconds>', 'Maximum execution time (seconds)', parseFloat)
  .option('--no-network', 'Disable network in the container')
  .option('--pids-limit <limit>', 'Process limit', parseInt)
  .option('--read-only', 'Read-only rootfs')
  .action(async (opts) => {
    await runCode(opts.lang, opts.file, opts.collectFiles, {
      cpus: opts.cpus,
      cpuset: opts.cpuset,
      memory: opts.memory,
      memorySwap: opts.memorySwap,
      timeout: opts.timeout,
      noNetwork: opts.noNetwork,
      pidsLimit: opts.pidsLimit,
      readOnly: opts.readOnly,
    });
  });

program
  .command('info')
  .description('Show information about all CodeCage commands and features')
  .action(() => {
    const infoPath = path.join(__dirname, 'info.txt');
    const info = fs.readFileSync(infoPath, 'utf-8');
    console.log(info);
  });

program.parse(process.argv);
