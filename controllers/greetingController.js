const Greeting = require('../models/greetingModel');
const factory = require('./handlerFactory');

exports.getAllGreetings = factory.getAll(Greeting);
exports.getGreeting = factory.getOne(Greeting);
exports.updateGreeting = factory.updateOne(Greeting);
exports.deleteGreeting = factory.deleteOne(Greeting);
exports.createGreeting = factory.createOne(Greeting);
