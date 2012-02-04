var fs = require("fs");
var NodeFinder = require("./nodeFinder").NodeFinder;

 function showResult(list){
	_.each(list,function(node){			
		console.log("path => %s",node.path);
		console.log("files =>");
		console.log("	%s",node.files);
		console.log("----------");
	});
}

var startfrom = "/home/martin/site";
var nodeFinder  = new NodeFinder({startfrom: startfrom});
function writeLog(s){
	fs.writeFile('note.json',s,function(err){
		if(err) throw err;
		console.log("saved");
	})
}

nodeFinder.start(function(finder,db){
		//var result = finder.find(".js");
		//var str = JSON.stringify(db);
		//writeLog(str);
		console.log(db);
})

// nodeFinder.find({ path:["public","javascripts","lib"] },function(result){
// 		writeLog(JSON.stringify(result));
// });
