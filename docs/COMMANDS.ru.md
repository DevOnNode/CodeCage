# Документация по командам CodeCage CLI

## Основная команда

```
node src/cli/index.js run [опции]
```

## Опции команды run

| Опция                | Описание                                                             | Пример                   |
| -------------------- | -------------------------------------------------------------------- | ------------------------ |
| --lang <language>    | Язык программирования (python, js, cpp, java, go, csharp, ruby, php) | --lang js                |
| --file <path>        | Путь к файлу с кодом                                                 | --file examples/hello.js |
| --collect-files      | Сохранить все файлы результата из контейнера                         | --collect-files          |
| --cpus <cpus>        | Ограничение по CPU (например, 1.5 = полтора ядра)                    | --cpus 1.5               |
| --cpuset <cpus>      | Список ядер CPU (например, 0,1)                                      | --cpuset 0,1             |
| --memory <memory>    | Ограничение по памяти (например, 128m, 2g)                           | --memory 128m            |
| --memory-swap <mem>  | Ограничение по памяти+swap (например, 256m)                          | --memory-swap 256m       |
| --timeout <seconds>  | Максимальное время выполнения (секунд)                               | --timeout 5              |
| --no-network         | Отключить сеть в контейнере                                          | --no-network             |
| --pids-limit <limit> | Лимит процессов внутри контейнера                                    | --pids-limit 5           |
| --read-only          | Только чтение rootfs (запрет записи в файловую систему контейнера)   | --read-only              |

## Примеры использования

- Запуск Python-скрипта с ограничением по памяти и времени:
  ```bash
  node src/cli/index.js run --lang python --file examples/hello.py --memory 64m --timeout 3
  ```
- Запуск JS-файла с двумя ядрами CPU и без сети:
  ```bash
  node src/cli/index.js run --lang js --file examples/hello.js --cpus 2 --no-network
  ```
- Сбор всех файлов результата:
  ```bash
  node src/cli/index.js run --lang cpp --file examples/hello.cpp --collect-files
  ```

## Дополнительные команды

- info — показать справку по возможностям CLI
  ```bash
  node src/cli/index.js info
  ```
- help — стандартная справка по командам
  ```bash
  node src/cli/index.js help
  ```
