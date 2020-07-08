const express = require('express');
const mysql = require('mysql');
const connection = require('../../config/db');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/', (req, res) => {
    if (!req.body.username || !req.body.password)
        res.status(200).send({error: "missing infomation"});
    else{
        var username = req.body.username;
        var password = req.body.password;

        var query = 'SELECT * FROM users WHERE username = ? LIMIT 1';
        connection.query(query, [username], (err, rows) => {
            if (err)
                res.status(200).send({error: "database error"});
            else if(!rows[0])
                res.status(200).send({error: "invalid user"});
            else if (!bcrypt.compareSync(password, rows[0].Password))
                res.status(200).send({msg: 'incorrect password'});
            else if (rows[0] && rows[0].Verify == 0)
                res.status(200).send({msg: 'you need to verify your account, check your email'});
            else
            {
                query = 'UPDATE users SET Online = 1 WHERE username = ?';
                connection.query(query, [username], (err) => {
                    if (err) res.status(200).send({error: 'trouble connecting to the database, sorry'});
                })
                res.status(200).send({
                        username: rows[0].username, 
                        token: rows[0].Token,
                        resetToken: rows[0].Reset_token
                    });
            }
       });
       
    }
});

module.exports = router;