const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

const logger = require('../logger/logger');
const { fetch } = require("undici");
const jp = require("jsonpath");

const btnBack = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('back')
			.setLabel('Back')
			.setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
			.setCustomId('next')
			.setLabel('Next')
			.setStyle(ButtonStyle.Secondary),
);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('urban')
		.setDescription('Find the urban definition of a word')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Word or sentence')
                .setRequired(true))
        .addIntegerOption((option) =>
            option.setName('result_num')
                .setDescription('The result number of your query (defaults to first result)')
                .setMinValue(0).setMaxValue(9)
                .setRequired(false)),
	async execute(interaction) {
        const query = interaction.options.getString('query');
        logger.debug(`query: ${query}`);

        let resultNum = interaction.options.getInteger('result_num');
        if (!resultNum) { resultNum = 0; }
        logger.debug(`query num: ${resultNum}`)

        const response = await fetch(`${process.env.URBAN_API}?term=${query}`);
        const result = await response.json();

        const maxResultNum = jp.query(result, '$.list.length') - 1;
        logger.debug(`max results available: ${maxResultNum}`);

        const defURL = jp.query(result, `$.list.${resultNum}.permalink`)

        const definition = jp.query(result, `$.list.${resultNum}.definition`);
        let example = jp.query(result, `$.list.${resultNum}.example`);

        if (example.toString().length >= 1024) {
            example = `Example too long, click [here](${defURL}) to read the example.`
        }

        const thumbup = jp.query(result, `$.list.${resultNum}.thumbs_up`);
        const thumbdown = jp.query(result, `$.list.${resultNum}.thumbs_down`);
        
        const urbanEmbed = {
            color: 0x2F3136,
            title: `Defenition of ${query}`,
            url: `${defURL}`,
			description: `${definition}` || `No definition available`,
            fields: [
				{
					name: 'Example:',
					value: `${example}` || `No example available`,
					inline: false,
				},
            ],
            timestamp: new Date(),
            footer: {
                text: `👍 ${thumbup} 👎 ${thumbdown}`,
            },
        };

		await interaction.reply({ embeds: [urbanEmbed], components: [btnBack] });
	},
};