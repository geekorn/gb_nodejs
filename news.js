const http = require('http');
const request = require('request');
const cheerio = require('cheerio');

const PORT = 8080;
const URL = 'https://habrahabr.ru/';
let posts = [];

request(URL, (error, response, html) => {
    if (error) {
        return console.error('error is: ', error);
    }

    if (response.statusCode !== 200) {
        return console.log('incorrect statusCode: ', response.statusCode);
    }

    const $ = cheerio.load(html);

    $('.post').each( (i, item) => {
        let post = {
            toString: function () {
                return `${this.time} | ${this.author} | <a href="${this.link}">${this.title}</a>`
            }
        };

        post.author = $(item).find('.user-info__nickname').text();
        post.title = $(item).find('.post__title_link').text();
        post.link = $(item).find('.post__title_link').attr('href');
        post.time = $(item).find('.post__time').text();

        posts.push(post.toString())
    })
})


http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html;  charset=utf-8'
    });

    response.write(posts.join('<br/>'));
    response.end();
}).listen(PORT, function () {
    console.log("Let's get started: http://localhost:" + PORT);
});