# CodeCage

## Description

**CodeCage** is a platform for safe code execution, sandboxing, and runtime analysis for multiple programming languages using Docker.

### Features

- Run code in isolated Docker containers
- Flexible resource limits (CPU, memory, time, processes, network)
- Multi-language support (Python, JS, C++, Java, Go, C#, Ruby, PHP)
- CLI interface with detailed help
- Clean, colorful logging
- Execution metrics and statistics
- Modular, maintainable architecture

### Project Structure

```
CodeCage/
├── src/
│   ├── core/           # Core logic (runner, docker, limits, temp, output)
│   ├── utils/          # Utilities (logger, metrics)
│   ├── cli/            # CLI interface
│   └── languages/      # Language support
├── dockerfiles/        # Dockerfiles for languages
├── examples/           # Code examples
├── results/            # Run results
├── temp/               # Temporary files
├── tests/              # Tests
├── package.json        # Dependencies
├── README.md           # Documentation
└── .gitignore
```

### Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

### CLI Commands Documentation

Full list of CLI commands and options with examples: [COMMANDS.en.md](COMMANDS.en.md)

### Requirements

- Node.js >= 16
- Docker
