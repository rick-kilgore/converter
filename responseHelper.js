
function respond(status, contentType, content, rsp) {
    var encoding = 'binary';
    if (contentType.search(/text\//i) == 0) {
        encoding = 'utf8';
    }
    rsp.writeHead(status, {'Content-Type': contentType});
    rsp.write(content, encoding);
    rsp.end();
}

exports.respond = respond;
