var _ = require("underscore");
exports.getTailNode = function (target,nodes){
		var curPtr = target;
		_.each(nodes,function(node){
				
				if( curPtr[node] == undefined )
						curPtr[node] = {};
				curPtr = curPtr[node];
		});
		return curPtr;
};
exports.getPath = function(source,root,pathPattern){
		var path = source.match(pathPattern)[0],
			start = path.indexOf(root) == 0 ? root.length: 0,
			end = path.length-start-1;
		path  = path.substr(start,end);
		return path;
};

