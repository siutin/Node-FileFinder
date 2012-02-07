var exec = require("child_process").exec;
var _ = require("underscore");
var LsParser =  require("./lib/lsParser").LsParser;

var NodeFileFinder = function(options){
	var _options = options || {};
	var settings = this.settings = { 
			preloaded: false
	}; 
	var startfrom = settings.startfrom = _options.startfrom || null;
	var source = settings.source = _options.source || null;

	this.lsParser = new LsParser(startfrom,source) || {};
	this.db = null;
};

 NodeFileFinder.prototype.start = function(callback){
 	var self = this;
 	var settings = this.settings;
	if(!settings.preloaded){
		exec("ls -R -A -l " + settings.startfrom + " | grep -v ^d",
			function(error,stdout,stderr){
				//console.log(stdout);
				self.db = self.lsParser.toDictionary(stdout) || null;
				self.settings.preloaded = true;
				callback(self,self.db);
		});
	}else{
		callback(self,this.db);
	}
};

NodeFileFinder.prototype._nameFilter = function(fileName){
	var db = this.db;
	var query = _.filter(db,function(record){ 
		return record.name == fileName;
	});
	return query;
}

NodeFileFinder.prototype._typeFilter = function(typeName){
	var db = this.db;
	var query = _.filter(db,function(record){ 
		return record.type == typeName;
	});
	return query;
}
NodeFileFinder.prototype._pathFilter = function(path){
	if(!_.isArray(path)) return;
	
	var db = this.db;
		qu = _.filter(db,function(record){
			return record.path.length == path.length;
		});
	var query = _.filter(qu,function(record){
		return _.isEmpty(_.difference(record.path,path));
	});
	return query;
};

NodeFileFinder.prototype._find = function(selector){
	if(_.isNull(selector) || _.isUndefined(selector) ||  _.isEmpty(selector)) return this;
	
	if(_.isString(selector)){
		switch(_.first(selector)){
			//Find By Name
			case "#":
				return this._nameFilter(_.rest(selector).join(''));
				break;
			//Find By Type
			case ".":
				return this._typeFilter(_.rest(selector).join(''));
				break;
			//Find By Path
			default:
				return this;
		}
	}else{
		var options = selector || {};
		var name = options.name || null;
		var type = options.type || null;
		var path = options.path || null;
	}
};

NodeFileFinder.prototype.find = function(selector,callback){
	var settings = this.settings;
	if(!settings.preloaded){
		this.start(function(finder){
			var result = finder._find(selector);
			callback(result);
		});	
	}else{
		var result = this._find(selector);
		return result;
	}
};



exports.NodeFileFinder = NodeFileFinder;