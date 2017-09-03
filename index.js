var ansi = require('ansi'),
    cursor = ansi(process.stdout);

let chalk = require('chalk');
let error = chalk.red.bold;
let warning = chalk.yellow;
let result = chalk.black.bgCyan;

cursor.beep();

function diff (a, b) {
    if (b == 0) {
        return error('На 0 делить нельзя');
    }

    return result(a / b);
}

console.log(diff(40,20));

console.log(error('Error: noname error'));
console.log(warning('just a warning'));