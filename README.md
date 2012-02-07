#Node-FileFinder

a Node JS Library for searching files and return a array result.
 
#Setup

	npm install Node-FileFinder

#Example

	// set the base directory
	var nodeFileFinder  = new NodeFileFinder({startfrom: startfrom});

	// start nodeFinder service
	nodeFileFinder.start(function(finder){

		// find by type
		var result = finder.find(".js");

		console.log(result);

	})

#Result
After calling a find function , the result would be returned as below:
	
	[
      {
         "name":"nodeFinder",
         "type":"js",
         "path":["home","martin","nodefinder"]
      },
      {
         "name":"example",
         "type":"js",
         "path":["home","martin","nodefinder","examples"]
      },
      {
         "name":"utilities",
         "type":"js",
         "path":[
            "home","martin","nodefinder","examples"]
      },
      ...
      ..
      ]

#Methods

##start(callback)
 	update soon

##find(selector)
 	update soon

## License 

(The MIT License)

Copyright (c) 2012 Siu Tin (twitter.com/osiutino)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.