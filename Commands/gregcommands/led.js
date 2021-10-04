module.exports = {
    name: "led",
    description: "LIGHT EMITTING DIODE",
    async execute(interaction) {
        interaction.channel.send('https://media1.tenor.com/images/e782e9078c7f4762f3f5d238416c811b/tenor.gif?itemid=23096778');
        return interaction.followUp('done!')
    },
}