
function keys(obj) {
    var keys = [];
    for (var key in obj) {
        keys.push(key);
    }
    return keys;
}

var obj = { 'foo': 'bar', 'name': 'rick', 'last': 'kilgore' };
console.log(obj);

var key = keys(obj)[0];
delete obj[key];
console.log(obj);
