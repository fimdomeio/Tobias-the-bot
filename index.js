var config = require('./config'); //reads configuration variables
var log = require('custom-logger').config({level: 0 });
var stateMachine = require('./stateMachine.js');
var fs = require('fs');
var xmpp = require('simple-xmpp');

var commands = {};

fs.readdir(__dirname+'/commands',function(err, files){
	if(err){
		log.error(err);
	}else{
		for(var i = 0; i < files.length; i++){
			var splitFileName = files[i].split(".");
			if(splitFileName.pop() === 'js'){
				var className = files[i].substr(0, files[i].lastIndexOf('.')); 
				commands[className] = require(__dirname + '/commands/' + files[i]);
				}
			}
		}
	stateMachine.loadCommands(commands);
});

//Connect to xmpp server
xmpp.connect({
    jid         : config.xmpp.jid,
    password    : config.xmpp.password,
    host        : config.xmpp.host,
		port				: config.xmpp.port
});

xmpp.on('online', function() {
    log.info('Oh yeah! Tobias is online');
});

xmpp.on('chat', function(from, message){
	stateMachine.newMessage(from, message);
});

