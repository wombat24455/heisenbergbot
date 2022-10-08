const logger = require('../logger/logger');
const jp = require("jsonpath");

const theMan = process.env.THE_MAN_HIMSELF;


module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message, client) {
        if (message.content == theMan) { message.reply('You\'re goddamn right.') }
    }
}
