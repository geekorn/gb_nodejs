const request = require('request');
const cheerio = require('cheerio');

const url = 'https://habrahabr.ru/';

request(url, (error, response, body) => {
    if (error) console.dir(err);
    if (response.statusCode >= 400) console.log(response.statusCode);

    const $ = cheerio.load(body);
    let posts = [];

    $('.post').each( (i, item) => {
        let post = {};

        post.author = $(item).find('.user-info__nickname').text();
        post.title = $(item).find('.post__title_link').text();
        post.link = $(item).find('.post__title_link').attr('href');
        post.time = $(item).find('.post__time').text();

        posts.push(post)
    })

    console.dir(posts)
})