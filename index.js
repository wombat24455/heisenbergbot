const { Client, IntentsBitField, Collection } = require('discord.js');
const logger = require('./logger/logger');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const botIntents = new IntentsBitField();
botIntents.add(IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildPresences, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent);

const client = new Client({ intents: botIntents });
client.commands = new Collection();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
	logger.info(`Events registered: ${event.name}`)
}

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
	logger.info(`Commands registered: ${command.data.name}`);
}

/*
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	logger.info(`commands set: ${command.name}`);
}
*/

client.login(process.env.TOKEN);
