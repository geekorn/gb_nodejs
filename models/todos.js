const config = require('../config.js');
const mysql = require('mysql');
const pool = mysql.createPool(config.db);
const QUERY = {
    getAll: 'SELECT * FROM todos WHERE 1',
    getById: 'SELECT * FROM todos WHERE id='
}

const data = {
    tasks: [
        {
            id: 1,
            name: 'Первая заметка',
            description: 'Описание заметки'
        }
    ]};

module.exports = {    
    getAll () {
        return new Promise((resolve, reject) => {
            resolve(data);
            // pool.getConnection( (error, connection) => {
            //     if (error) reject(error);

            //     connection.query(QUERY.getAll, (err, rows) => {
            //         if (err || !rows) {
            //             reject(err);
            //         }

            //         resolve(rows);
            //         connection.release()
            //     })
            // })
        })
    },

    getById (id) {

    },
    addTask (task) {
        let newTask = {
            id: data.tasks.length + 1,
            name: task,
        };

        data.tasks.push(newTask);
        console.dir(data.tasks)
    }
}