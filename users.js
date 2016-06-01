var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CWLeaderBoard = new Schema({
    name: String
});
var User = mongoose.model('User', CWLeaderBoard);