const { SlashCommandBuilder } = require('discord.js');
const pm = require('@socialskycorp/pretty-ms');
const { version } = require('discord.js');
const os = require('os');

const slashStatus = "In progress";
const memoryStats = `${((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)}`;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Displays information about the bot'),
	async execute(interaction, client) {

        const infoEmbed = {
            color: 0x2F3136,
            title: 'Heisenberg bot',
            thumbnail: {
                url: `https://cdn.discordapp.com/avatars/979866047236681768/4e91186b8f2bdd9f478405b9efaef989.webp?size=80`
                //url: `${client.user.avatarURL}`
            },
			fields: [
				{
					name: '\u200b',
					value: '**Bot Information**',
					inline: false,
				},
				{
					name: '**Slash Commands**',
					value: `${slashStatus}`,
					inline: true,
				},
                {
					name: '**Library**',
					value: `Discord.js v${version}`,
					inline: true,
				},
				{
					name: '**Node**',
					value: `${process.version}`,
					inline: true,
				},
                {
					name: '**Developer**',
					value: `<@546107653718540298>`,
					inline: true,
				},
				{
					name: '\u200b',
					value: '**Bot Statistics**',
					inline: false,
				},
				{
					name: '**Total Users**',
					//value: `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`,
					value: `NaN`,
                    inline: true,
				},
                {
					name: '**Human Users**',
					value: `NaN`,
					inline: true,
				},
                {
					name: '**Servers**',
					//value: `${client.guilds.cache.size}`,
                    value: `NaN`,
					inline: true,
				},
                {
					name: '**Bot Uptime**',
					//value: `${pm(client.uptime, {secDecimalDigits: 0})}`,
					value: `NaN`,
                    inline: true,
				},
				{
					name: '\u200b',
					value: '**System Information**',
					inline: false,
				},
				{
					name: '**System Platform**',
					value: `${os.platform()}`,
					inline: true,
				},
				{
					name: '**System Architecture**',
					value: `${os.arch()}`,
					inline: true,
				},
				{
					name: '**CPU Cores**',
					value: `${os.cpus().length / 2} (${os.cpus().length} logical)`,
					inline: true,
				},
				{
					name: '**System Memory**',
					value: `${memoryStats} GB`,
					inline: true,
				},		
				{
					name: '**System Uptime**',
					value: `${pm(os.uptime() * 1024, {secDecimalDigits: 0})}`,
					inline: true,
				},
			],
            timestamp: new Date(),
            footer: {
                text: `Info requested by ${interaction.user.username}`,
                icon_url: `${interaction.user.avatarURL()}`,
            },
        };

		await interaction.reply({ embeds: [infoEmbed] });
	},
};