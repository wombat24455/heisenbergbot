const logger = require('../logger/logger');

module.exports = {
    name: 'messageDelete',
    once: false,
    execute(message) {
        const fullUser = message.author.tag;
        const userID = message.author.id;
        const avatar = message.author.displayAvatarURL();

        const channelName = message.channel.name;
        const msg = message.content;

        const logchannel = process.env.LOG_CHANNEL;
        const testlogs = process.env.TEST_LOGS;

        if (message.author.bot) return;
        
        const log = message.guild.channels.cache.find(channel => channel.id === logchannel);

        const MessageDeletedEmbed = {
            color: 0xE06666,
            title: `Message deleted in \`\`#${channelName}\`\``,
            author: {
                name: `${fullUser}`,
                icon_url: `${avatar}`
            },
            description: `${msg}`,
            timestamp: new Date(),
            footer: {
                text: `User ID: ${userID}`,
            }
        }

        logger.info(`${fullUser} deleted \"${msg}\" in #${channelName}`);
        log.send({ embeds: [MessageDeletedEmbed] });
    }
}
