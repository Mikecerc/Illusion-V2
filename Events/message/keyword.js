module.exports = {
    name: 'keyword',


    async execute(message) {
        console.log(message.content);
        if (message.content.includes('I want to join programming')) {
            return message.channel.send(`You cant legally say that here. Shame on you <@${message.author.id}>`);
        }
    },
};