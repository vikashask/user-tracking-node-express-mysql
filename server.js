const dotenv = require('dotenv').config({path:'./.env'})
const port = process.env.PORT || 8080;
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const express  = require('express');
const app  = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(multer().any());
app.use(cors()); //enable cores

require('./config/knex')(app);

var routes = require('./routes');
app.use('/', routes)

// creating server
var server  = http.createServer(app);

server.listen(port, () => { console.log(`Server is listening on port => ${port}`); })