const connection = require('../../config/db');
const express = require('express');
const { query } = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// const session = require('express-session');
// const geo = require('geotools');
// const ip = require('ip');
// const { NULL } = require('mysql/lib/protocol/constants/types');
// const secretString = Math.floor((Math.random() * 10000) + 1);


//personal details update
router.post('/personal/', (req, res) => {
    if (!req.body.username || !req.body.firstname || !req.body.lastname || !req.body.email)
        res.status(200).send({msg : "please fill in the missing"});
    else{
        var username = req.body.username;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;
        var query = 'SELECT * FROM users WHERE username = ? OR email = ?';
        
        connection.query(query, [username, email], (err, rows) => {
            if (err){
                res.status(500).send({error: "database error"});
            }
            else if (rows[0] && rows[0]['username']) {
                res.status(200).send({msg: "username already exist"});
            }
            else if (rows[0] && rows[0]['Email']) {
                res.status(200).send({msg: "email already exist"});
            }
            else{
                //update the user 
                query = 'UPDATE users SET username = ?, Firstname = ?, Lastname = ?, Email = ? WHERE username = ?';
                connection.query(query, [username, firstname, lastname, email], (err) => {
                    if (err) res.status(500).send({error: "database error"});
                    else console.log('users update success');
                });
                //update user hobbies
                query = 'UPDATE user_hobbies SET username = ? WHERE username = ?';
                connection.query(query, [username], (err) => {
                    if (err) res.status(500).send({error: "database error"});
                    else console.log(" user_hobbies update success");
                });
                //update user filters
                query = 'UPDATE user_filters SET username = ? WHERE username = ?';
                connection.query(query, [username], (err) => {
                    if (err) res.status(500).send({error: "database error"});
                    else console.log(" user_filters update success");
                });
                res.status(200).send({msg: "success", data: req.body}); 
            }
        })
    }
});

//update the password
router.post('/password/', (req, res) => {
    if (!req.body.password || !req.body.vPassword)
        res.status(200).send({error: 'missing field'}); 
    else {
        if (req.body.password !== req.body.vPassword)
            res.status(200).send({error: 'password dont match'});
        else{
            var hash = bcrypt.hashSync(req.body.password, 12);
            var query = 'UPDATE users SET Password = ? WHERE username = ?';
            connection.query(query ,[hash, req.session.user], (err) => {
                if (err) res.status(500).send({error: 'database error'}); 
                else console.log(" password update success");
            })
            res.status(200).send({msg: "success"}); 
        }
    }
});

// Location Update needs some coding 
router.post('/location/', (req, res) => {
    res.status(200).send({msg: "sorry we have'nt coded it yet"});
});

// Update the additional 
router.post('/additional', (req, res) => {
    if (!req.body || !req.body.orientation || !req.body.bio)
        res.status(200).send({msg : "please fill in the missing"});
    else{
        res.status(200).send({msg: "sorry we have'nt coded it yet", s: req.body});
        // var query = 'UPDATE users SET Orientation = ?, Bio = ? WHERE username = ?';
        // connection.query(query,[req.body.Orientation, req.body.Bio, req.session.user], (err) => {
        //     if (err)
        //         res.status(500).send({error: 'database error'});
        //     else
        //         console.log("bio and orientation update success");
        // });
    }
});

module.exports = router;