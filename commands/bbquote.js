const { SlashCommandBuilder } = require('discord.js');
const logger = require('../logger/logger');
const { fetch } = require("undici");
const jp = require("jsonpath");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bbquote')
		.setDescription('Get a random quote from Breaking Bad'),
	async execute(interaction) {
        /*
        const response = await fetch(process.env.BB_API);
        const result = await response.json();
        
        console.log(result);

        const quote = jp.query(result, '*.quote');
        logger.debug(`quote: ${quote}`);

        const author = jp.query(result, '*.author');
        logger.debug(`author: ${author}`);

        const series = jp.query(result, '*.series');
        logger.debug(`series: ${series}`);
        
        const urbanEmbed = {
            color: 0x2F3136,
            title: `${series} quote:`,
            description: `${quote}\n- ${author}`,
            timestamp: new Date(),
            footer: {
                text: `Quote requested by ${interaction.user.username}`,
                icon_url: `${interaction.user.avatarURL()}`,
            },
        };

		await interaction.reply({ embeds: [urbanEmbed] });
        */

        interaction.reply("Command is still in progress");
	},
};