

function objectKeys(obj) {
    var keys = [];
    for (var key in obj) {
        keys.push(key);
    }
    return keys;
}


function objectCar(obj) {
    var key = objectKeys(obj)[0];
    var value = obj[key];
    return { 'name': key, 'value': value };
}


function objectCdr(obj) {
    var i = 0;
    var newObj = { };
    for (var key in obj) {
        if (i > 0) {
            newObj[key] = obj[key];
        }
        ++i;
    }
    return newObj;
}

function objectIsEmpty(obj) {
    var keys = objectKeys(obj);
    return keys.length == 0;
}

exports.objectKeys = objectKeys;
exports.objectCar = objectCar;
exports.objectCdr = objectCdr;
exports.objectIsEmpty = objectIsEmpty;


