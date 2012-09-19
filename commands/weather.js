var config = require('../config'); 
var http = require('http');

var apikey = config.weather.wuAPI; //You'll have to get your own api key at weather underground
var lang = config.weather.wuLang;
var defaultCity = config.weather.defaultCity;
var city = ''; 

//This command is not complete yet. Try the weather for Barcelona, it will give you, Barcelona, Venezuela, but what if you wanted Barcelona, Spain??
//proper internationalization is still also missing

this.run = function(step, from, message){
	switch(step){
	case 0:
		xmpp.send(from, "where?");
		break;
	case 1:
		if(message === ""){
			city = defaultCity;
		}else{
			city = message;
		}
		query = '/q/'+city;
		querywunderground(query, from);
		return "end";
	}
};

function querywunderground(query, from){
	console.log('weather: query made');
	http.get("http://api.wunderground.com/api/"+apikey+"/geolookup/forecast/lang:"+lang+"/"+query+".json", function(res) {
		  var data = '';
		  res.on('data', function (chunk){
			 data += chunk;
		  });
		 res.on('end',function(){
		      var obj = JSON.parse(data);
			  if(typeof obj['forecast'] === 'undefined'){
				var secquery = obj['response']['results'][0]['l'];
				querywunderground(secquery, from);
			  }else{
				xmpp.send(from, "Here's the weather for "+obj['location']['city']+', '+obj['location']['country_name']);
				sendforecast(obj, from);
			  }
		 });
	}).on('error', function(e) {
		  console.log("Got error: " + e.message);
	});
}

function sendforecast(obj, from){
	for(var i = 0; i<6; i++){
	  	xmpp.send(from, obj['forecast']['txt_forecast']['forecastday'][i]['title']+': '+
	 		 obj['forecast']['txt_forecast']['forecastday'][i]['fcttext_metric']
	  	);
	}
}
