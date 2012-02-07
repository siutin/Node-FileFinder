var _ = require("underscore");


var fn = {
	getRelativePath: function(){
		return this.path.join("/") + "/" + this.name + (this.type?"." + this.type : "");
	}
};

var fileNode ={
	fn:{},
	make:function fileNode (obj) {
			var o =  _.extend(obj,this.fn);
			return o;
	}
}

_.extend(fileNode.fn,fn);
_.extend(exports,fileNode);