var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connecting db
mongoose.connect('mongodb://admin:admin123@ds343127.mlab.com:43127/todos');

// Creating schema
var todoSchema = new mongoose.Schema({
    item: String
})

var Todo = mongoose.model('Todo', todoSchema);
// var itemone = Todo({item: 'abc'}).save(function(err){
//     if (err) {
//         throw err;
//     } else {
//         console.log('item saved');
//     }
// })

// var data = [{item: 'milk'},{item: 'butter'},{item: 'xyz'}]
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){

app.get('/todo', function(req,res){
    Todo.find({}, function(err, data){
        if (err) {
            throw err;
        } else {
            res.render('todo', {todos: data});
        }
    });
});

app.post('/todo', urlencodedParser, function(req,res){
    var newTodo = Todo(req.body).save(function(err,data){
        if (err) {
            throw err;
        } else {
            res.json(data);
        }
    })
});

app.delete('/todo/:item', function(req,res){
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){        if (err) {
            throw err;
        } else {
            res.json(data);
        }
    });
});

}