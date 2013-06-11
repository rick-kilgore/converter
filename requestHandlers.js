var responseHelper = require('./responseHelper');
var paramsUtil = require('./paramsUtil');
var transforms = require('./transforms');
var rkutils = require('./rkutils');
var qs = require('querystring');
var fs = require('fs');
var formidable = require('formidable');
var IMAGE_PATH = '/tmp/upload.jpg';


function htmlBegin() {
    return '<html>\n'
              +'<head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/></head>\n'
              +'<body>\n';
}

function htmlEnd() {
    return '</body></html>\n';
}

function start(req, rsp) {
    console.log('start action');
    var body = htmlBegin()
              +'<form action="/upload" enctype="multipart/form-data" method="post">'
              +'<input type="file" name="upload" multiple="multiple">'
              +'<input type="submit" value="Upload file"/></form>'
              +htmlEnd();

    responseHelper.respond(200, 'text/html', body, rsp);
}

function upload(req, rsp) {
    console.log('upload action');
    var form = new formidable.IncomingForm();
    form.parse(req, function(error, fields, files) {
        fs.rename(files.upload.path, IMAGE_PATH, function(error) {
            if (error) {
                fs.unlink(IMAGE_PATH);
                fs.rename(files.upload.path, IMAGE_PATH);
            }
        });

        rsp.writeHead(302, { 'Location': '/show' });
        rsp.end();
    });
}


function showPage(req, rsp) {
    console.log('showPage action');
    var htmlText = 'Uploaded image:<br/><img src="/showImage"/>';
    var params = paramsUtil.getQueryParams(req);
    if (params) {
        htmlText = htmlText.replace('showImage', 'showImage?'+params);
    }
    responseHelper.respond(200, 'text/html', htmlText, rsp);
}



function showImage(req, rsp) {
    console.log('showImage action');
    var params = paramsUtil.getQueryParamsObj(req);
    showImage_recurse(rsp, IMAGE_PATH, params);
}

function showImage_recurse(rsp, filename, params) {
    console.log("showImage_recurse(%s, %j)", filename, params);
    if (rkutils.objectIsEmpty(params)) {
        showImageFinal(rsp, filename);
    } else {
        var car = rkutils.objectCar(params);
        var transformName = car['name'];
        var transformValue = car['value'];
            var handler = transforms[transformName];
            console.log("calling "+transformName);
            if (typeof handler === 'function') {
                var transFilename = filename.replace(/(.*)\./, "$1..");
                handler(filename, transFilename, transformValue, function(error, stdout, stderr) {
                    if (error) {
                        console.log("error: %s\n", error);
                        responseHelper.respond(500, 'text/plain', error+'\n', rsp);
                    } else {
                        showImage_recurse(rsp, transFilename, rkutils.objectCdr(params));
                    }
                });
            } else {
                showImage_recurse(rsp, filename, rkutils.objectCdr(params));
            }
    }
}

function showImageFinal(rsp, filename) {
    var handler = function(error, file) {
        if (error) {
            responseHelper.respond(500, 'text/plain', error+'\n', rsp);
        } else {
            responseHelper.respond(200, 'image/jpeg', file, rsp);
        }
    };
    fs.readFile(filename, 'binary', handler);
}




exports.start = start;
exports.upload = upload;
exports.show = showPage;
exports.showImage = showImage;

