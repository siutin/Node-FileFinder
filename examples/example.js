var ut = require("./utilities");
var NodeFinder = require("./../nodeFinder").NodeFinder;

var startfrom = "~/";
var nodeFinder  = new NodeFinder({startfrom: startfrom});
nodeFinder.start(function(finder,db){

	var result;
	console.log("// find *.png  ---- >");

	console.time("#findpng");
	result = nodeFinder.find(".png");
	console.timeEnd("#findpng");
	
	ut.showResult(result);
});
