var mongoose = require('mongoose');
mongoose.connect('mongodb://arsenal:omodolapo@ds033601.mongolab.com:33601/arsenalfc');
var db = mongoose.connection;
db.on('error', function (callback) {
  console.log('Did not connect to database !!'); 
});
db.once('open', function (callback) {
  console.log('Connected to database...'); 
});

var schema = new mongoose.Schema(
  { 
    name: String,
    age: Number,
    jerseyNumber: Number,
    position: String,
    numberOfGoals: Number,
    country: String,
    rating: Number,
    link:  String
  }
);
var ArsenalFC = mongoose.model('ArsenalFC', schema);

module.exports = ArsenalFC;