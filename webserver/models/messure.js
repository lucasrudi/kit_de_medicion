var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var messureSchema = Schema({
  temperature: Number,
  humidity: Number,
  created: { type: Date, default: Date.now }
}, {
  collection: 'messures'
});

module.exports.messure = mongoose.model('Messure', messureSchema);
