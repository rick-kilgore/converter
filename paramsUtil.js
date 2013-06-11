

function getQueryParams(req) {
    var url = require('url').parse(req.url);
    return url.query;
}

function getQueryParamsObj(req) {
    var query = getQueryParams(req);
    var queryObj = require('querystring').parse(query);
    return queryObj;
}

function getQueryParam(req, name) {
    return getQueryParamsObj(req)[name];
}

exports.getQueryParams = getQueryParams;
exports.getQueryParamsObj = getQueryParamsObj;
exports.getQueryParam = getQueryParam;

