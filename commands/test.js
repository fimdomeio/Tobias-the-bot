var stateMachine = require('../stateMachine');
var commandName = 'test';
var commandData = {};
var args;
var showLinks;
var initialCommandMessage;



this.run = function(step, from, message){

	switch(step){
	case 'init':
		stateMachine.start(from, commandName);
		stateMachine.message(from, 'Executing test command');
		stateMachine.end(from);
		break;
	}
	//ending
	
		
};

