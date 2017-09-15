const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const request = require('request');
const bodyParser = require('body-parser');
const templating = require('consolidate');


const PORT = 8080;
const URL = 'https://habrahabr.ru/';

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
    res.render('index', {
        title: 'App work :)'
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}, Ctrl+C to stop`);
})
// server.listen(PORT, 'localhost');
// server.on('listening', function () {
//   console.log('Express server started on port %s at %s', server.address().port, server.address().address);
// });