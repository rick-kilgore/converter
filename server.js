var port = 7000;
var http = require('http');
var url = require('url');

function start(router) {
    function onRequest(req, rsp) {
        var pathname = url.parse(req.url).pathname;
        console.log('%s: %s, pathname=%s', new Date().toISOString(), req.url, pathname);
        router.route(pathname, req, rsp);
    }

    http.createServer(onRequest).listen(port);
    console.log('Server listening on port %d', port);
}

exports.start = start;
