# CodeCage CLI Commands Documentation

## Main Command

```
node src/cli/index.js run [options]
```

## run Command Options

| Option               | Description                                                         | Example                  |
| -------------------- | ------------------------------------------------------------------- | ------------------------ |
| --lang <language>    | Programming language (python, js, cpp, java, go, csharp, ruby, php) | --lang js                |
| --file <path>        | Path to the code file                                               | --file examples/hello.js |
| --collect-files      | Save all result files from the container                            | --collect-files          |
| --cpus <cpus>        | CPU limit (e.g., 1.5 = one and a half cores)                        | --cpus 1.5               |
| --cpuset <cpus>      | List of CPU cores (e.g., 0,1)                                       | --cpuset 0,1             |
| --memory <memory>    | Memory limit (e.g., 128m, 2g)                                       | --memory 128m            |
| --memory-swap <mem>  | Memory+swap limit (e.g., 256m)                                      | --memory-swap 256m       |
| --timeout <seconds>  | Maximum execution time (seconds)                                    | --timeout 5              |
| --no-network         | Disable network in the container                                    | --no-network             |
| --pids-limit <limit> | Limit the number of processes in the container                      | --pids-limit 5           |
| --read-only          | Read-only rootfs (forbid writing to the container filesystem)       | --read-only              |

## Usage Examples

- Run a Python script with memory and time limits:
  ```bash
  node src/cli/index.js run --lang python --file examples/hello.py --memory 64m --timeout 3
  ```
- Run a JS file with two CPU cores and no network:
  ```bash
  node src/cli/index.js run --lang js --file examples/hello.js --cpus 2 --no-network
  ```
- Collect all result files:
  ```bash
  node src/cli/index.js run --lang cpp --file examples/hello.cpp --collect-files
  ```

## Additional Commands

- info — show CLI capabilities help
  ```bash
  node src/cli/index.js info
  ```
- help — standard help for commands
  ```bash
  node src/cli/index.js help
  ```
