const connection = require('../config/db');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
	
	if (!req.body.username || !req.body.token)
		res.status(200).send({msg: "no access"});
	else{
		var username = req.body.username;
		var query = "SELECT * FROM images WHERE username = ?";
		connection.query(username], (err, images) => {
			if (err) res.status(500).send({error: "database error"});
			else res.status(200).send({	msg: "success",
										image: images});
		}
	}
});

module.exports = router;
