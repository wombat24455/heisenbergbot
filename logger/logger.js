const info = '\x1b[32m%s\x1b[0m'; //green
const debug = '\x1b[33m%s\x1b[0m'; //yellow
const error = '\x1b[31m%s\x1b[0m'; //red
const critical = '\x1b[91m%s\x1b[0m';

const date = new Date();

let logger = {
    info: function (msg) {
        console.log(info, `[ INFO ${date.toLocaleDateString()} ${date.toLocaleTimeString()} ] ${msg}`);
    },
    debug: function (msg) {
        console.log(debug, `[ DEBUG ${date.toLocaleDateString()} ${date.toLocaleTimeString()} ] ${msg}`);
    },
    error: function (msg) {
        console.log(error, `[ ERROR ${date.toLocaleDateString()} ${date.toLocaleTimeString()} ] ${msg}`);
    },
    critical: function (msg) {
        console.log(critical, `[ CRITICAL ${date.toLocaleDateString()} ${date.toLocaleTimeString()} ] ${msg}`);
    }
}

module.exports = logger;
