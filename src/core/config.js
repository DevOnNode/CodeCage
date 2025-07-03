module.exports = {
  DEFAULT_LIMITS: {
    cpus: 1,
    memory: '128m',
    memorySwap: '256m',
    timeout: 5,
    pidsLimit: 10,
    readOnly: true,
    noNetwork: true,
  },

  PATHS: {
    results: 'results',
    temp: 'temp',
    dockerfiles: 'dockerfiles',
  },

  SUPPORTED_LANGUAGES: [
    'python',
    'js',
    'cpp',
    'java',
    'go',
    'csharp',
    'ruby',
    'php',
  ],
};
