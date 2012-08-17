var config = require('./config');
var xmpp = require('simple-xmpp');


xmpp.connect({
    jid         : config.xmpp.jid,
    password    : config.xmpp.password,
    host        : config.xmpp.host,
    port        : config.xmpp.port
});

xmpp.on('online', function() {
    console.log('Oh yeah! Tobias is online');
	xmpp.send(config.admin.email, "I'm awake, I'm awake");
});


xmpp.on('error', function(err) {
    console.error(err);
});
