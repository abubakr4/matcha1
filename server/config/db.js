const mysql = require('mysql');
const connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : '',
    database    : 'matcha'
});

connection.connect(function(err){
    if(err){
        throw err;
    }
    else{
        console.log('database connected');
    }
});
module.exports = connection;