var _ = require("underscore");
var helper = require("./helper");

var directoryPattern = /(.)?\/(.+):([^\/]+)?\n\n/gi;
var pathPattern = /\/(.+):/gi;
var contentPattern = /:([^[\/]+)?\n\n/gi;

var LsParser = function(root,source,options){
	this.root = root || "";
	this.setup = function(options){
		var _options = options || {};
		var settings = this.settings = {};
		this.result = _options.result || null;
		settings.source = _options.source || null;
		settings.node = {};
		settings.nodeSchema = _options.nodeSchema || null;
		this.append = _options.append || null;
		this.stringlineHandler = _options.stringlineHandler || null;
	}
	this.setup(options);
}
LsParser.prototype.core = function(){
	var self = this, node;
	var settings = this.settings;
	var nodeSchema = JSON.stringify(settings.nodeSchema);
	var stringlineHandler = this.stringlineHandler;
	var parts = settings.source.match(directoryPattern);
	_.each(parts,function(part){
		node = JSON.parse(nodeSchema);

		var path = helper.getPath(part,self.root,pathPattern);
		node.path = path.split("/") || [];		
		
		var contents = part.match(contentPattern);
		_.each(contents,function(content){
			var contentline = content.split("\n");
			var validFiles = _.reject(contentline,function(line , i){ return (i <= 1 || line.length == 0); });
			
			_.each(validFiles,function(stringline,i){
				var start = stringline.lastIndexOf(" ")+1;
				var file = stringline.substr(start,stringline.length);
				node.files.push(file);
			});
		});		
		self.append(node);
	});
	settings.source = null;
	return this.result;
}

LsParser.prototype.s = function(){
	var self = this,node;
	var settings = this.settings;
	var nodeSchema = JSON.stringify(settings.nodeSchema);
	var parts = settings.source.match(directoryPattern);
	_.each(parts,function(part){
		node = JSON.parse(nodeSchema);
		var path = helper.getPath(part,self.root,pathPattern);
		
		node.path = _.rest(path.split("/")) || [];		
		
		var contents = part.match(contentPattern);
		_.each(contents,function(content){
			var contentline = content.split("\n");
			var validFiles = _.reject(contentline,function(line , i){ return (i <= 1 || line.length == 0); });
			
			_.each(validFiles,function(stringline,i){		
				var filestart = stringline.lastIndexOf(" ")+1;
				var file = stringline.substr(filestart,stringline.length);
				var typestart = file.lastIndexOf(".")+1;
				var type = file.substr(typestart,file.length);
				node.Name = file.trim();
				node.type = type.trim();
				self.append(node);
			});
		});
	});
	settings.source = null;
	return this.result;	
}
LsParser.prototype.toDictionary = function(str){

	var self = this;
	var settings = this.settings;
	this.setup({
			nodeSchema: { Name:null, type:null, path:[] },
			result: [],
			source: str || settings.source,
			append: function(node){
				var data = _.extend({},node);
				self.result.push(data);
			}
	});	
	return this.s();
}

LsParser.prototype.toList = function(str){
	var self = this;
	var settings = this.settings;
	var node = settings.node;
	this.setup({
			nodeSchema: {"path": [],"files": []	},
			result: [],
			source: str || settings.source,
			append: function(node){
				self.result.push(node);
			},
			stringlineHandler: function(stringline){
				
			}
	});
	return this.core();
};

LsParser.prototype.toJSON = function(str){
	var self = this;
	var settings = this.settings;
	this.setup({
			nodeSchema: {"path": [],"files": []	},
			result: {},
			source: str || settings.source,
			append: function(node){
				var curPtr = helper.getTailNode(self.result,node.path);
				_.extend(curPtr,{"$FILES": node.files});
			}
		});
	return this.core();
};
LsParser.prototype._push = function(target,key,val){
	var self = this;
	var settings = this.settings;
	(target[key] || (function(){target[key] = []; return target[key]})()).push(val)
}
exports.LsParser = LsParser;