const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());


//const home = require('./routes/api/home');
const login = require('./routes/api/login');
const register = require('./routes/api/register');
const settings = require('./routes/api/settings');

//app.use('/api/home', home);
app.use('/api/login', login);
app.use('/api/register', register);
app.use('/api/settings', settings);


const port = 5000 || process.env.PORT;

app.listen(port, () => console.log(`Server started on port ${port}`));





















//const morgan = require('morgan');
// app.use();
//middleware
//install morgan


// app.post('/register', (req, res) => {
//     console.log(req.body);
//     if (req.body.username == 'lindani'){
//         res.status(400).send({error: "false"})
//     }
//     else{
//         res.send({
//             message: "this is from the backend"
//         });
//     }	
// });