const request = require('request');
const cheerio = require('cheerio');

/**
 * функция парcинга сайта, возвращает промисс
 * @param {string} url 
 * @param {number} count 
 */
function getNews(category, count) {
    const URL = 'https://habrahabr.ru/flows/' + category;

    return new Promise((resolve, reject) => {
        request(URL, (error, response, body) => {
            if (error) {
                reject(error);
            }
        
            if (response.statusCode !== 200) {
                reject(response.statusCode);
            }

            const $ = cheerio.load(body);
            const posts = [];
            
            $('.post').each( (i, item) => {
                let post = {};

                if (i < count) {
                    post.author = $(item).find('.user-info__nickname').text();
                    post.title = $(item).find('.post__title_link').text();
                    post.link = $(item).find('.post__title_link').attr('href');
                    post.time = $(item).find('.post__time').text();
            
                    posts.push(post)
                };
            })

            resolve(posts)
        })
    })
};

module.exports = getNews;