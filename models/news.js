const request = require('request');
const cheerio = require('cheerio');

function getNews (url) {
    request(url, (error, response, body) => {
        if (error) {
            return console.error('error is: ', error);
        }
    
        if (response.statusCode !== 200) {
            return console.error('incorrect statusCode: ', response.statusCode);
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
}