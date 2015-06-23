var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = Schema({
    input: String,
    result: String
});

var Message = mongoose.model('Message', messageSchema);