const mongoose = require('mongoose');

const greetingSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, 'Greeting must not have an autor!'],
  },
  message: {
    type: String,
    required: [true, 'Greeting must have a message!'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Greeting = mongoose.model('Greeting', greetingSchema);

module.exports = Greeting;
