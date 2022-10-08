const { SlashCommandBuilder } = require('discord.js');

const slashStatus = "In progress";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays all the available commands'),
	async execute(interaction) {
        const helpEmbed = {
            color: 0x2F3136,
            title: 'Heisenberg commands',
			description: `**Need support?**: Ask <@546107653718540298>\n**Slash Commands**: ${slashStatus}`,
			fields: [
				{
					name: '\u200b',
					value: '**Command Categories**',
					inline: false,
				},
				{
					name: 'General',
					value: '```\nhelp\ninfo\nping```',
					inline: true,
				},
				{
					name: 'Miscellaneous',
					value: '```\nurban```',
					inline: true,

				},
				{
					name: 'Fun',
					value: '```\ncoming soon```',
					inline: true,
				},
			],
            timestamp: new Date(),
            footer: {
                text: `Help requested by ${interaction.user.username}`,
                icon_url: `${interaction.user.avatarURL()}`,
            },
        };
		
		await interaction.reply({ embeds: [helpEmbed] });
	},
};