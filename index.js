// import packages
const express = require('express');
const app = express();
// const http = require('http');
// const server = http.createServer(app);
const request = require('request');
const bodyParser = require('body-parser');
const templating = require('consolidate');

// import config & data
const config = require('./config.js');
const db = require('./models/todos');

// view engine setup
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// console.dir(data)
// // app routers 
app.get('/', (req, res) => {
    db.getAll()
        .then(
            resolve => {
                console.dir(resolve)
                res.render('index', { tasks: resolve })
            },
            error => {
                console.dir('error index.js')
            }
        )
})

app.post('/add', (req, res) => {
    // console.dir(req.body)
    db.add(req.body.task).then( () => {
        res.redirect('/')        
    })
})

app.get('/delete/:id', (req, res) => {
    console.dir(req.params)
    db.delete(req.params.id).then( (sql) => {
        console.dir(sql)
        res.redirect('/')        
    })
})

// server create
app.listen(config.server.port, () => {
    console.log(`Server listening on http://localhost:${config.server.port}, Ctrl+C to stop`);
})