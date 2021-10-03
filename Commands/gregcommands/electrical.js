module.exports = {
    name: 'electrical',
    description: 'David\'s most infamous quote',
    async execute(interaction) {
        interaction.channel.send('https://media1.tenor.com/images/0e74eead09d35405afba612e599f0d0c/tenor.gif?itemid=23097399');
        return interaction.followUp('done!');
    }
}