var config = require('./config'); //reads configuration variables
var xmpp = require('simple-xmpp');


//Connect to xmpp server
xmpp.connect({
    jid         : config.xmpp.jid,
    password    : config.xmpp.password,
    host        : config.xmpp.host,
    port        : config.xmpp.port
});

//Let Admin know when online
xmpp.on('online', function() {
    console.log('Oh yeah! Tobias is online');
	xmpp.send(config.admin.jid, "I'm awake, I'm awake");
});


//When Message is recieved
	// Is it part of a previous command?
	// if true request next step
	// else find which command corresponde to the keyword sent
	// run the corresponding file



//Run time based tasks






//Output errors
xmpp.on('error', function(err) {
    console.error(err);
});
