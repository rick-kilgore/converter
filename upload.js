var port = 7007;
var formidable = require('formidable');
var http = require('http');
var sys = require('sys');

http.createServer(function(req, rsp) {
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.parse(req, function(error, fields, files) {
            rsp.writeHead(200, {'content-type': 'text/plain'});
            rsp.write('received upload:\n\n');
            rsp.end(sys.inspect({fields: fields, files: files}));
        });
        return;
    }

    // show a file upload form
    rsp.writeHead(200, {'content-type': 'text/html'});
    rsp.end('<form action="/upload" enctype="multipart/form-data" method="post">\n'
            +'<input type="text" name="title"><br>\n'
            +'<input type="file" name="upload" multiple="multiple"><br>\n'
            +'<input type="submit" value="Upload">\n'
            +'</form>');
}).listen(port);

console.log('listening on port '+port);
