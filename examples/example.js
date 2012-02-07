var ut = require("./utilities");
var NodeFileFinder = require("./../").NodeFileFinder;

var startfrom = "~/nodefinder";
var nodeFileFinder  = new NodeFileFinder({startfrom: startfrom});
nodeFileFinder.start(function(finder,db){

	var result;
	console.log("// find *.index  ---- >");

	console.time("#find index");
	result = finder.find(".js");
	console.timeEnd("#find index");
	
	console.log(JSON.stringify(result));
});
