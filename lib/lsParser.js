var _ = require("underscore");
var helper = require("./helper");
var fileNode = require("./fileNode");

var directoryPattern = /(.)?\/(.+):([^\/]+)?\n/gi;
var pathPattern = /\/(.+):/gi;
var contentPattern = /:([^[\/]+)?\n/gi;

var LsParser = function(root,source,options){
	this.root = root || "";
	this.setup = function(options){
		var _options = options || {};
		var settings = this.settings = {};
		this.result = _options.result || null;
		settings.source = _options.source || null;
		settings.nodeSchema = _options.nodeSchema || null;
		this.append = _options.append || null;
	}
	this.setup(options);
}

LsParser.prototype.dictParse = function(){
	var self = this,node;
	var settings = this.settings;
	var nodeSchema =settings.nodeSchema;
	var parts = settings.source.match(directoryPattern);
	_.each(parts,function(part){
		node =  _.extend({},nodeSchema);
		var path = helper.getPath(part,self.root,pathPattern);
		
		node.path = _.rest(path.split("/")) || [];		
		
		var contents = part.match(contentPattern);
		_.each(contents,function(content){
			var contentline = content.split("\n");
			var validFiles = _.reject(contentline,function(line , i){ return (i <= 1 || line.length == 0); });
			
			_.each(validFiles,function(stringline,i){		
				var filestart = stringline.lastIndexOf(" ")+1;
				var file = stringline.substr(filestart,stringline.length);

				var nameend = file.lastIndexOf(".");
				var name = file.substr(0,nameend < 0 ? stringline.length : nameend);
				
				var typestart = nameend+1;
				var type = typestart == 0 ?"": file.substr(typestart,file.length);
				node.name = name.trim();
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
			nodeSchema: { name:null, type:null, path:[] },
			result: [],
			source: str || settings.source,
			append: function(node){
				var data = _.extend({},node);
				var n = fileNode.make(data);
				self.result.push(n);
			}
	});	
	return this.dictParse();
}

LsParser.prototype._push = function(target,key,val){
	var self = this;
	var settings = this.settings;
	(target[key] || (function(){target[key] = []; return target[key]})()).push(val)
}
exports.LsParser = LsParser;