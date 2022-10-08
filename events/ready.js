const { ActivityType } = require('discord.js');
const logger = require('../logger/logger');
const bot = require('../package.json');

const prettyms = bot.dependencies['@socialskycorp/pretty-ms'];
const discordrest = bot.dependencies['@discordjs/rest'];
const discordjs = bot.dependencies['discord.js'];
const jsonpath = bot.dependencies.jsonpath;
const dotenv = bot.dependencies.dotenv;
const undici = bot.dependencies.undici;

function InfoTable() {
	console.log(`-----------------------------------------`)
	console.log(`|         Heisenberg Bot v${bot.version}         |`);
	console.log(`-----------------------------------------`);
	console.log(`|              Dependencies             |`);
	console.log(`-----------------------------------------`);
	console.log(`| @socialskycorp/pretty-ms |  ${prettyms}    |`);
	console.log(`| @discordjs/rest          |  ${discordrest}    |`);
	console.log(`| discord.js               |  ${discordjs}   |`);
	console.log(`| jsonpath                 |  ${jsonpath}    |`);
	console.log(`| dotenv                   |  ${dotenv}   |`);
	console.log(`| undici                   |  ${undici}   |`)
	console.log(`-----------------------------------------\n`);
}

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        client.user.setActivity('the meth cook', { type: ActivityType.Watching });
		InfoTable();
		logger.info(`Bot ready, server count: ${client.guilds.cache.size}`);
    },
};
