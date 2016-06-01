var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var server = express.Router();
var Schema = mongoose.Schema;

app.use('/api',server);
mongoose.connect('mongodb://localhost/CWLeaderBoard');

server.param('userName',function (req,res,next,userName) {
    User.findOne({user: userName},function(err,doc){
        if (err) return  res.sendStatus(404);
        req.dev= doc;
        next();
    });
});

var CWLeaderBoard = new Schema({
    user: String,
    honor: Number,
    position: Number,
    rank: Number,
    profileUrl: String
});
var User = mongoose.model('User', CWLeaderBoard);

server.route('/')
    .get(function (req, res) {
        User.find({}, function(err,doc){
            return res.status(200).json(doc);
        });
    });

server.route('/:userName')
    .get(function (req,res) { //get developer by userName
        res.json(req.dev);
    });


app.listen(3001);