var config = {};

config.version = {};
config.xmpp = {};
config.admin = {};

config.version.number = "2.0";

//Change this settings to your match your configuration
config.xmpp.jid       = 'bot@domain';
config.xmpp.password  = 'password';
config.xmpp.host      = 'host';
config.xmpp.port      = '5222';

//This is the bot administrator
config.admin.name = 'Your Name';
config.admin.jid = 'you@email';

module.exports = config;
