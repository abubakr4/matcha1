const connection = require('../../config/db');
const express = require('express');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
// const session = require('express-session');
// const unirest = require('unirest');
// const ip_loc = require('ip-locator');
// const iplocation = require('iplocation');

const router = express.Router();

router.post('/', (req, res) => {
    if (!req.body.username || !req.body.firstname ||
            !req.body.lastname || !req.body.age || !req.body.email || 
            !req.body.password || !req.body.vPassword) {
        res.status(200).send("please give the full shit");
    }
    else{
        var username = req.body.username;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;
        var age = req.body.age;
        var password = req.body.password;
        var vPassword = req.body.vPassword;
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
            else if (password != vPassword) {
                res.status(200).send({msg: "password does'nt match"});
            }
            else
            {
                var hash = bcrypt.hashSync(password, 12);
                //insert the user 
                query = 'INSERT INTO `users` (`username`, `Firstname`, `Lastname`, `Age`, `Email`, `Password`, `profile_pic`) VALUES (?, ?, ?, ?, ?, ?, "Uploads/stock_profile_pic.png")';
                connection.query(query, [username, firstname, lastname, age, email, hash], (err) => {
                    if (err) res.status(500).send({error: "database error"});
                    else console.log('users db sucess');
                });
                //insert on user hobbies
                query = 'INSERT INTO `user_hobbies` (`username`) VALUES (?)';
                connection.query(query, [username], (err) => {
                    if (err) res.status(500).send({error: "database error"});
                    else console.log(" user hobbies db sucess");
                });
                //insert on user filters
                query = 'INSERT INTO `user_filters` (`username`, `Age`, `Orientation`) VALUES (?, "None", "None")';
                connection.query(query, [username], (err) => {
                    if (err) res.status(500).send({error: "database error"});
                    else console.log(" user filters db sucess");
                });
                // insert on token to user db
                var token = (Math.random() + 1).toString(36).substr(2, 15)
                query =  'UPDATE users SET Reset_token = ? WHERE Email = ?';   
                connection.query(query, [token, email], (err) => {
                    if (err) console.log(err)
                });
                // sending the email

                // var url = '<a href="' + req.protocol + '://' + req.get('host') +
                //  '/Verify_email/' + token + '">Verify your Account creation</a>'
                // var transporter = nodemailer.createTransport({
                //     service: 'gmail',
                //     port: 587,
                //     secure: false,
                //     auth:
                //     {
                //         user: 'koketsomatjeke.km@gmail.com',
                //         pass: 'ilovedragons'
                //     }
                // });
                // console.log("transport created");
                // let mailOptions = transporter.sendMail({
                //     from: 'koketsomatjeke.km@gmail.com', // sender address
                //     // to: req.body.Email, // list of receivers
                //     to: req.body.Email, // list of receivers
                //     subject: 'Account verification', // Subject line
                //     html: '<p>Click Here to verify your account creation ' + url + '</p>'// plain text body
                // });
                // console.log("email sent");

                // adding a location to the user db


                // var user = username;
                // var apiCall = unirest('GET', 'https://get.geojs.io/v1/ip');
                // apiCall.end((response) => {
                //     if (response.body.length > 0)
                //     {
                //         ip_loc.getDomainOrIPDetails(response.body, 'json', (err, data) => {
                //             if (err)
                //                 res.send("An error has occured!");
                //             else
                //             {
                //                 console.log(data);
                //                 // adding longatude
                //                 query = "UPDATE users SET Longitude = ? WHERE username = ?";
                //                 connection.query(query, [data.lon, username], (err, succ) => {
                //                     if (err) console.log(err);
                //                     else console.log('longitude updated')
                //                 });
                //                 //adding latitude
                //                 query = "UPDATE users SET Latitude = ? WHERE username = ?";
                //                 connection.query(query, [data.lat, username], (err, succ) => {
                //                     if (err) console.log(err);
                //                     else console.log('latitude updated')
                //                 });
                //                 //adding city
                //                 query = "UPDATE users SET City = ? WHERE username = ?";
                //                 connection.query(query, [data.city, username], (err, succ) => {
                //                     if (err) console.log(err);
                //                     else console.log('city updated')
                //                 });
                //             } 
                //         })
                //     }
                //})
                res.status(200).send({mgs: 'everything went okay'});
            }
        });
    }
});

module.exports = router;


// check the password for regex
// check is the users information complete, 
//all of the text fields i think the must be check in the fornt end
// create functions to split the work its too overwhelming 
