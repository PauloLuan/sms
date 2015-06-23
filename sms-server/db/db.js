var mongoose = require('mongoose');

// Connect to mongodb
var connect = function () {
	mongoose.connect('mongodb://localhost/sms');

	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
	    console.log("connection stabished!");
	});
};

// Bootstrap models
fs.readdirSync(__dirname + '/../models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/../models/' + file);
});


module.exports.connect = connect;