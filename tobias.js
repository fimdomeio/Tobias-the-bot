var config = require('./config'); //reads configuration variables
var log = require('custom-logger').config({level: 0 });
var xmpp = require('simple-xmpp');
var fs = require('fs');
var moment = require('moment'); //for parsing, validating, manipulating, and formatting dates.
var schedule = require('node-schedule'); //for scheduling tasks
var i18n = require('i18n');
i18n.configure({
	//setup some locales - other locales default to en silently
	locales:['en', 'pt'],
    // where to register __() and __n() to, might be "global" if you know what you are doing
    register: global
});
i18n.setLocale(config.i18n.lang);

//Connect to xmpp server
xmpp.connect({
    jid         : config.xmpp.jid,
    password    : config.xmpp.password,
    host        : config.xmpp.host,
	port        : config.xmpp.port
});

moment.lang(config.i18n.lang);

var global_commandState = {}; //global variable that stores current command step and stuff 

//loads all bot nodejs commands
var commands = {};
fs.readdir(__dirname+'/commands',function(err, files){
	var i;
	if(err){
		log.error(err);
	}else{
		for(i = 0; i < files.length; i++){
			var splitFileName = files[i].split(".");
			if(splitFileName.pop() === 'js'){
				var className = files[i].substr(0, files[i].lastIndexOf('.')); 
				commands[className] = require(__dirname + '/commands/' + files[i]);
			}
		}
	}
	console.warn(commands);
});

//Let Admin know when online
xmpp.on('online', function() {
    log.info('Oh yeah! Tobias is online');
	xmpp.send(config.admin.jid, "I'm awake, I'm awake");
});


//When Message is recieved
xmpp.on('chat', function(from, message) {
	var args = message.split(' ');
	// TODO Is it part of a previous command?
	// http://stackoverflow.com/a/4702844
	var commandState = global_commandState;
	if (typeof commandState[from] === 'undefined') { // IF IT'S A NEW COMMAND
		commandState[from] = {};
		commandState[from].command = args[0];
		commandState[from].step = 0;
	}else{ // IF IT'S PART OF A PREVIOUS COMMAND
		commandState[from].step += 1;
	}
	global.xmpp = xmpp;	
	// else find which command corresponde to the keyword sent
	if(typeof commands[commandState[from].command] !== 'undefined'){
		var results = commands[commandState[from].command].run(commandState[from].step,from,message);
		if(results === "end"){
			delete commandState[from];
		}
	}else{
		xmpp.send(from, __("That's not a valid command."));
	}
});
//Run time based tasks






//Output errors
xmpp.on('error', function(err) {
    console.error(err);
});
