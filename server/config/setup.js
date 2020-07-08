const mysql = require('mysql');
const connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : '',
    database    : 'matcha',
    socketPath : ""
});

connection.connect();

connection.query('CREATE DATABASE IF NOT EXISTS matcha');
console.log('Database Created');
connection.query('CREATE TABLE IF NOT EXISTS users(id INT(11) AUTO_INCREMENT NOT NULL, username VARCHAR(255) NOT NULL, Firstname VARCHAR(255) NOT NULL, Lastname VARCHAR(255) NOT NULL,Age INT(11), Email VARCHAR(255) NOT NULL, Password VARCHAR(255) NOT NULL, Token VARCHAR(255) DEFAULT \'NULL\',Reset_token VARCHAR(255) DEFAULT \'NULL\', City VARCHAR(255),Longitude FLOAT, Latitude FLOAT, Orientation VARCHAR(255), Bio VARCHAR(1000), profile_pic VARCHAR(1000), Online INT(1) DEFAULT 0, Verify INT(1) DEFAULT 0, Complete INT(1) DEFAULT 0, PRIMARY KEY (id))');
console.log('table users created');
connection.query('CREATE TABLE IF NOT EXISTS user_hobbies(id INT(11) AUTO_INCREMENT NOT NULL, username VARCHAR(255) NOT NULL, Hobby1 VARCHAR(25), Hobby2 VARCHAR(25), Hobby3 VARCHAR(25), Hobby4 VARCHAR(25), Hobby5 VARCHAR(25), PRIMARY KEY (id))');
console.log('table user_hobbies created');
connection.query('CREATE TABLE IF NOT EXISTS user_filters(id INT(11) AUTO_INCREMENT NOT NULL, username VARCHAR(255) NOT NULL, Hobby VARCHAR(25), City VARCHAR(255), Distance FLOAT, Orientation VARCHAR(255), PRIMARY KEY (id))');
console.log('table user_filters created');
connection.query("CREATE TABLE IF NOT EXISTS images (username VARCHAR(255) NOT NULL, image VARCHAR(1500) NOT NULL);", (err, succ) => {
    if (err)
        console.log(err);
    else if (succ)
        console.log("table images created");
})
connection.end();
