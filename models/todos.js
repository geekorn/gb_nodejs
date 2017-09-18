const config = require('../config.js');
const mysql = require('mysql');
const pool = mysql.createPool(config.db);

module.exports = {    
    getAll () {
        const sql = 'SELECT * FROM todos WHERE 1';

        return new Promise((resolve, reject) => {
            pool.getConnection( (error, connection) => {
                if (error) reject(error);

                connection.query(sql, (err, rows) => {
                    if (err || !rows) {
                        reject(err);
                    }

                    resolve(rows);
                    connection.release()
                })
            })
        })
    },

    getById (id) {
        const sql = `SELECT * FROM todos WHERE id=${id}`;
        
        return new Promise((resolve, reject) => {
            pool.getConnection( (error, connection) => {
                if (error) reject(error);

                connection.query(sql, (err, rows) => {
                    if (err || !rows) {
                        reject(err);
                    }

                    resolve(rows);
                    connection.release()
                })
            })
        })
    },
    addTask (task) {
        const sql = `INSERT INTO todos (title, description) VALUES (${task}, "Описание заметки")`;

        return new Promise((resolve, reject) => {
            pool.getConnection( (error, connection) => {
                if (error) reject(error);

                connection.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("1 record inserted");
                    resolve();
                  });
            })
        })
        
    }
}