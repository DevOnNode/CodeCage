const fs = require('fs');

console.log('Тестовый вывод 12345!');

fs.writeFileSync(
  'result.txt',
  'Это результат, сохранённый в файле.',
);
fs.writeFileSync(
  'data.json',
  JSON.stringify(
    {
      test: true,
      time: new Date().toISOString(),
    },
    null,
    2,
  ),
);
