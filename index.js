const inquirer = require('inquirer');
const chalk = require('chalk');

var error = chalk.red.bold;
var warning = chalk.yellow;
var result = chalk.black.bgCyan;

var rounds = [];
var questions = [
    {
        type: 'confirm',
        name: 'game',
        message: 'Do you want to play the game?'
    }
];

inquirer.prompt(questions).then(function (answers) {
    if (!answers.game) {
        console.log('Очень жаль')
    } else {
        playGame();
        console.dir(rounds)
    }
});

function playGame() {
    var random = Math.round(Math.random());
    var round = [{
        type: 'input',
        name: 'round',
        message: 'Good! Orel(0) ili reshka(1)?',
        validate: function (value) {
            var answer = value.match("[/0*|1?/]")

            return (answer) ? true : 'vvedite 0(orel) ili 1(reshka)';
        }
    }];
    var askAgain = [{
        type: 'confirm',
        name: 'askAgain',
        message: 'Do you want to play more (just hit enter for YES)?',
        default: true,
        validate: function (value) {
            var answer = value.match("/Y[es]*|N[o]?/")

            return (answer) ? true : 'vvedite Y ili N';
        }
    }];

    inquirer.prompt(round)
        .then(function (answers) {

            rounds.push({
                yourChoice: answers.round,
                win: answers.round == random
            });


            (answers.round == random) ? console.log(result('You win')) : console.log(error('You lose'));
        })
        .then(function () {
            inquirer.prompt(askAgain).then(function (answer) {
                if (answer.askAgain) {
                    playGame();
                } else {
                    closeGame();
                }
            })
        })
}

function closeGame () {
    var win = rounds.filter( item => item.win)
    console.log('Вы сыграли ' + rounds.length + ' раундов')
    console.log('Вы выграли ' + win.length + ' раз')

}