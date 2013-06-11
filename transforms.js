

function rotate(inputFilename, outputFilename, degrees, callback) {
    var exec = require('child_process').exec;
    exec('convert '+inputFilename+' -background "rgba(0,0,0,0.5)" -rotate '+degrees+' '+outputFilename, callback);
}

function resize(inputFilename, outputFilename, size, callback) {
    var exec = require('child_process').exec;
    exec('convert '+inputFilename+' -resize '+size+' '+outputFilename, callback);
}

function tint(inputFilename, outputFilename, arg, callback) {
    var color = arg;
    var amount = 40;
    if (color.search(/:/) > 0) {
        color = arg.replace(/:.*/, '');
        amount = arg.replace(/.*:/, '');
    }
    var exec = require('child_process').exec;
    exec('convert '+inputFilename+' -fill '+color+' -tint '+amount+' '+outputFilename, callback);
}

function crop(inputFilename, outputFilename, arg, callback) {
    arg = arg.replace(/ /g, '+');
    var dimensions = arg;
    var gravity = 'Center';
    if (arg.search(/:/) > 0) {
        dimensions = arg.replace(/:.*/, '');
        gravity = arg.replace(/.*:/, '');
    }
    var exec = require('child_process').exec;
    exec('convert '+inputFilename+' -crop '+dimensions+' -gravity '+gravity+' '+outputFilename, callback);
}

exports.rotate = rotate;
exports.resize = resize;
exports.crop = crop;
exports.tint = tint;
