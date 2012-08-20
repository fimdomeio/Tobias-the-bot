var EventEmitter = require('events').EventEmitter;
var command = new EventEmitter;

command.on('start', function(message, from){
	command.emit('message', from, 'succcess');	
});

module.exports = command;
