
var reqHandlers = require('./requestHandlers');
/*
var handlers = {};
handlers['/'] = reqHandlers.start;
handlers['/start'] = reqHandlers.start;
handlers['/upload'] = reqHandlers.upload;
*/


function getHandler(pathname) {
    if (pathname == '/') {
        return reqHandlers.start;
    } else {
        var action = pathname.substr(1);
        return reqHandlers[action];
    }
}


function route(pathname, req, rsp) {
    console.log('routing request for '+pathname);
    var handler = getHandler(pathname);
    if (typeof handler === 'function') {
        handler(req, rsp);
    } else {
        console.log('no request handler found for '+pathname);
        var responseHelper = require('./responseHelper');
        responseHelper.respond(404, 'text/plain', 'no request handler found for '+pathname, rsp);
    }
}

exports.route = route;

