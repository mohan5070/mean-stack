var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}
app.set('views', __dirname+'/server/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(stylus.middleware({
    src: __dirname+'/public',
    compile: compile
}));

app.use(express.static(__dirname + '/public'));

app.get('/partials/:partialPath', function(req, res){
    res.render('partials/'+req.params.partialPath);
});

var port= 3030;
app.listen(port);
console.log('Listeningon Port '+port+'...');

if(env === 'development') {
mongoose.connect('mongodb://localhost:27017/multivision', { useMongoClient: true });
}else {
    mongoose.connect('mongodb://mohan5070:soori@123@ds127065.mlab.com:27065/multivision');
}
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('Connection db openend');
});

var Schema = mongoose.Schema;
var Message = mongoose.model('Message', new Schema({message: String}));
var mongoMessage;
Message.findOne().exec(function(err, messageDoc) {
    console.log(err);
    console.log(messageDoc);
    if(messageDoc) {
        mongoMessage = messageDoc.message;
    }else {
        mongoMessage = 'Yet to fix mongodb data rendering'
    }

});

app.get('*', function (req, res) {
    res.render('index', {
        mongoMessage: mongoMessage
    });
});