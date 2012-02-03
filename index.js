var path = "/home/martin/site/public";
var spawn = require("child_process").spawn,
		ls = spawn("ls",["-R","-l",path]);
var _ = require("underscore");

console.log("child.id:" + ls.pid);

var result = "";
ls.stdout.on('data',function(data){
	result+=data;
});
ls.on("exit",function(){
	var reg =new RegExp(/\/(.+):\ntotal (\d+)\n([^\/]+)?\n/gi);
	var parts = result.match(reg);

console.log("path =>");
	_.each(parts,function(part){
			part.match(reg)
			console.log(RegExp.$1);
	});
console.log("numbers of object per directory =>")
_.each(parts,function(part){
			part.match(reg)
			console.log(RegExp.$2);
	});
console.log("3.files/directory => ")
_.each(parts,function(part,i){
			part.match(reg)
			console.log(i);
			console.log(RegExp.$3);
	});
});
