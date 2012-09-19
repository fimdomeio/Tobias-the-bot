//RENAME THIS FILE TO CONFIG.JS AND fill with the correct values for your configuration 

var config = {};

config.version = {};
config.xmpp = {};
config.admin = {};
config.i18n = {};

config.version.number = "2.1";

//LANGUAGE
config.i18n.lang = 'languagecode';

//Change this settings to your match your configuration
config.xmpp.jid       = 'bot@domain';
config.xmpp.password  = 'password';
config.xmpp.host      = 'host';
config.xmpp.port      = '5222';

//This is the bot administrator
config.admin.name = 'Your Name';
config.admin.jid = 'you@host';


// COMMANDS CONFIGURATION

//WEATHER
config.weather = {};

config.weather.wuAPI = 'get your key at weather underground';
config.weather.lang = '2 uppercase letters for language like BR';
config.weather.defaultCity = 'if your user does not type any city what should we pick?';



module.exports = config;

