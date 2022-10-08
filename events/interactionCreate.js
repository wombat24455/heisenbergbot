const logger = require('../logger/logger');
const jp = require("jsonpath");

const blacklist = require('../json/blacklist.json');
const blacklistedUsers = jp.query(blacklist, '$.blacklisted[:]');

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
    
        if (!command) return;

        if (blacklistedUsers.includes(interaction.user.id)) return interaction.reply({ content: 'You are blacklisted from using my commands.', ephemeral: true });

        try {
            await command.execute(interaction);
            logger.info(`executing interaction: ${interaction}`)
        } catch (error) {
            await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
            logger.error(error);
            console.error(error);
        }
    }
}
