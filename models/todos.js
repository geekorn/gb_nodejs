const config = require('../config.js');
const mysql = require('mysql');
const pool = mysql.createPool(config.db);
const QUERY = {
    getAll: 'SELECT * FROM todos WHERE 1',
    getById: 'SELECT * FROM todos WHERE id='
}

module.exports = {    
    getAll () {
        return new Promise((resolve, reject) => {
            pool.getConnection( (error, connection) => {
                if (error) reject(error);

                connection.query(QUERY.getAll, (err, rows) => {
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

    },
}