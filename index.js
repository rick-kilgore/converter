
var server = require('./server');
var router = require('./router');

server.start(router);


function quit() {
    console.log('goodbye!');
    process.exit(0);
}

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('close', function() {
    quit();
});
rl.on('line', function(cmd) {
    if (cmd.search(/q/i) == 0) {
        quit();
    }
});
