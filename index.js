// import packages
const express = require('express');
const app = express();
// const http = require('http');
// const server = http.createServer(app);
const request = require('request');
const bodyParser = require('body-parser');
const templating = require('consolidate');

// import modules & data
const getNews = require('./models/news.js');
const data = require('./data.js');

// global variables declaration
const PORT = 8080;

// view engine setup
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app routers 
app.get('/', (req, res) => {
    res.render('index', data)
})

// обработка post запроса
app.post('/news', (req, res) => {  
    console.dir('req.body')  
    getNews(req.body.category, req.body.count)
        .then( 
            (result) => {
                data.news = {
                    category: req.body.category,
                    articles: result
                };
                console.dir(data)
                res.render('index', data)
            },

            (error) => {
                console.error(error)
            }
        )
})

// server create
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}, Ctrl+C to stop`);
})
// server.listen(PORT, 'localhost');
// server.on('listening', function () {
//   console.log('Express server started on port %s at %s', server.address().port, server.address().address);
// });