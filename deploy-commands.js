const fs = require('fs');
const logger = require('./logger/logger');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
//const { clientId, guildId, token } = require('./config.json');
const dotenv = require('dotenv');
dotenv.config();

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.TOKEN;

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands }) // replace .applicationGuildCommands with .applicationCommands when ready
	.then(() => logger.info(`Successfully registered application commands:\n${commandFiles.toString().replace(/(.js,|.js)/g, "\n")}`))
	.catch(console.error);