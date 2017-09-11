const http = require('http');
const request = require('request');
const inquirer = require('inquirer');
const chalk = require('chalk');

const URL = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170910T153848Z.2206a605e42afe86.5f1a529e6d237246092bd2a75b84b0d399b41b8b';
let questions = [
    {
        type: 'rawlist',
        name: 'lang',
        message: 'На какой язык будем переводить?',
        choices: ['ru', 'be', 'uk']
    },
    {
        type: 'input',
        name: 'text',
        message: 'Введите текст, который хотите перевести'
    }
];
let msg = chalk.yellow;
let translatedText = chalk.red;
let translation = chalk.blue;

console.log(msg('Переводчик с английского на (русский, белорусский, украинский)'));
inquirer.prompt(questions).then(answer => {
    request.get(`${URL}&lang=${answer.lang}&text=${answer.text}`, (error, response, body) => {
        if (error) {
            console.log('Error status: ' + error);
        }

        let text = JSON.parse(body).text[0]
        console.log(`Переводимый текст: ${translatedText(answer.text)}`);
        console.log(`Перевод: ${translation(text)}`)
    })
})
