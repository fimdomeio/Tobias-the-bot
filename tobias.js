var config = require('./config'); //reads configuration variables
var log = require('custom-logger').config({level: 0 });
var xmpp = require('simple-xmpp');
var fs = require('fs');
var i18n = require('i18n');
i18n.configure({
	//setup some locales - other locales default to en silently
	locales:['en', 'pt'],
    // where to register __() and __n() to, might be "global" if you know what you are doing
    register: global
});

//Connect to xmpp server
xmpp.connect({
    jid         : config.xmpp.jid,
    password    : config.xmpp.password,
    host        : config.xmpp.host,
    port        : config.xmpp.port
});

//loads all bote nodejs commands
var commands = {};
fs.readdir(__dirname+'/commands',function(err, files){
	if(err){
		log.error(err);
	}else{
		for(var i = 0; i < files.length; i++){
			var splitFileName = files[i].split(".");
			if(splitFileName.pop() == 'js'){
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
	// TODO if true request next step
	// else find which command corresponde to the keyword sent
	xmpp.send(from, "recieved a "+args[0]+ ' command.');
	log.warn(typeof commands[args[0]]);
	if(typeof commands[args[0]] != 'undefined'){
		log.info('Emitting start for ' + args[0] + ' command.');
		commands[args[0]].emit('start',from,message);
	}else{
		xmpp.send(from, __("That's not a valid command."));
	}
	/*
	 * if(commandfiles.indexOf(args[0]+'.js') != -1){
		xmpp.send(from, "commands exists");
		command = require('./commands/'+args[0]+'.js');
		command.emit('start', from, message);
		
		//THIS CODE IS MISPLACED AND NOT WORKING CORRECTLY
		command.on('message', function(from, reply){
			xmpp.send(from, reply);
			log.warn('should send message');
		});
	}else{
		xmpp.send(from, "command doesn't exist");
	} */
	//log.warn(require.resolve('./commands/'+args[0]));
	//command = require('./commands/'+args[0]);
	// run the corresponding file
});

//Run time based tasks






//Output errors
xmpp.on('error', function(err) {
    console.error(err);
});
