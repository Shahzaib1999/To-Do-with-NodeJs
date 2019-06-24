var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

// setup template engine
app.set('view engine', 'ejs');

app.use(express.static('./public'));

// fire controller
todoController(app);

// listen to port
app.listen(3000);
console.log('Listening to port 3000');
