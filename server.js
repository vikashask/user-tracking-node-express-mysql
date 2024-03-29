const dotenv = require('dotenv').config({path:'./.env'});
const port = process.env.PORT || 8080;
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const express  = require('express');
const app  = express();
const userController = require('./controllers/userController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(multer().any());
app.use(cors()); //enable cores

require('./config/knex')(app);

app.post('/login', userController.login);
app.post('/register', userController.register);
app.post('/forgot-password', userController.forgotPassword);

var routes = require('./routes');
app.use('/', routes);

// creating server
var server  = http.createServer(app);

server.listen(port, () => { console.log(`Server is listening on port => ${port}`); });