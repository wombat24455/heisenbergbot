const logger = require('../logger/logger');

module.exports = {
    name: 'messageUpdate',
    once: false,
    execute(oldMessage, newMessage) {
        const fullUser = oldMessage.author.tag;
        const userID = oldMessage.author.id;
        const avatar = oldMessage.author.displayAvatarURL();

        const oldMsg = oldMessage.content;
        const newMsg = newMessage.content;
        const channelName = oldMessage.channel.name;

        const logchannel = process.env.LOG_CHANNEL;
        const testlogs = process.env.TEST_LOGS;

        if (oldMessage.author.bot) return;
        
        const log = oldMessage.guild.channels.cache.find(channel => channel.id === logchannel);

        const MessageEditedEmbed = {
            color: 0x34B2F1,
            title: `Message edited in \`\`#${channelName}\`\``,
            description: `[Jump to message](${oldMessage.url})`,
            author: {
                name: `${fullUser}`,
                icon_url: `${avatar}`
            },
            fields: [
                {
                    name: 'Original message:',
                    value: `${oldMsg}`,
                },
                {
                    name: 'New message:',
                    value: `${newMsg}`,
                }
            ],
            timestamp: new Date(),
            footer: {
                text: `User ID: ${userID}`,
            }
        }
        
        logger.info(`${fullUser} edited \"${oldMsg}\" to \"${newMsg}\" in #${channelName}`);
        log.send({ embeds: [MessageEditedEmbed] });
    }
}
