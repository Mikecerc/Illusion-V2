module.exports = {
    name: 'keyword',
    /**
     * @param {Client} client
     * @param {Message} message
     */
    async execute(message) {
        if (message.content.includes('I want to join programming')) {
            return message.reply(`You cant legally say that here. Shame on you <@${message.author.id}>`);
        }
    },
};