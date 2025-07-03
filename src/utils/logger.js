const chalk = require('chalk').default;

module.exports = {
  info: (msg) => console.log(chalk.blue('[INFO]'), msg),
  error: (msg) => console.log(chalk.red('[ERROR]'), msg),
  success: (msg) => console.log(chalk.green('[SUCCESS]'), msg),
  result: (msg) => console.log(chalk.yellow('[RESULT]'), msg),
};
