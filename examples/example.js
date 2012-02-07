var ut = require("./utilities");
var NodeFileFinder = require("./../").NodeFileFinder;

var startfrom = "~/nodefinder";
var nodeFileFinder  = new NodeFileFinder({startfrom: startfrom});
nodeFileFinder.start(function(finder,db){

	var result;
	console.time("#find js");
	result = finder.find(".js");
	console.timeEnd("#find js");
	
	ut.showResult(result);
});
