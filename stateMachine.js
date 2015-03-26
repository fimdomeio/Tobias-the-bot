
/*
 * 
 * THE ALL NEW STATE MACHINE V3 *
 *
 */

var log = require('custom-logger').config({level: 0 });
var xmpp = require('simple-xmpp');

var commandState = {}; //variable that stores current command step and stuff 
var commands = {};

var start = function(from, command){
	commandState[from].command = command;
	log.info('Starting command '+ command + " for "+from);
}

var step = function(from, step){
	commandState[from].step = step;
	log.info('Stepping to '+ step + " to "+from);
}

var stepAndGo = function(from, step, message){
	commandState[from].step = step;
	commands[commandState[from].command].run(commandState[from].step, from, message);
	log.info('Stepping and going to '+ step + " to "+from);
}

var end = function(from){
	console.log(commandState);
	console.log(from);
	log.info('Finished command '+ commandState[from].command + " for "+from);
	delete commandState[from];
}

var message = function(to, message){
	xmpp.send(to,message);
}


//ALLOWS TO RUN STEPS WITHOUT HUMAN INTERVENTION. 
//IT'S ALIVE, IT'S ALIVE

var run = function(from, step){
	this.step(from, step); // not sure if this will work
	commands[commandState[from].command].run(commandState[from].step, from, "");
}

var newMessage = function(from, message){
	var exitcmd = 'exit';
	if(message !== exitcmd){
		if(typeof commandState[from] === 'undefined'){
			//NEW COMMAND
			var args = message.split(' ');
			commandState[from] = {};
			commandState[from].command = args[0];
			commandState[from].step = 'init';
		}
		if(typeof commands[commandState[from].command] !== 'undefined'){
			console.log('running');
			commands[commandState[from].command].run(commandState[from].step,from,message);
		}else{
			delete commandState[from];
			this.message(from, "That's not a valid command.");
		}
	}else {
		if(typeof commandState[from] === 'undefined'){
			stateMachine.emit('message', from, "I was't running any command");
		}
		end(from);
		xmpp.send(from, 'message', 'OK');
	}
}

var loadCommands = function(com){
	commands = com;
	//console.warn(commands);
}

module.exports.start = start;
module.exports.step = step;
module.exports.stepAndGo = stepAndGo;
module.exports.end = end;
module.exports.message = message;
module.exports.run = run;
module.exports.newMessage = newMessage;
module.exports.loadCommands = loadCommands;
