var fs = require("fs");
var _ = require("underscore");

exports.showResult = function (list){
	_.each(list,function(node,i){
		console.log();
		console.log("Path: %s",node.path.join('/'));
		console.log("File: %s",node.name);
		console.log("Type: %s",node.type);
		console.log();
	});
}

exports.writeJsonLog = function(name,s){

	fs.writeFile(name + '.json',s,function(err){
		if(err) throw err;
		console.log("log saved");
	})
}
