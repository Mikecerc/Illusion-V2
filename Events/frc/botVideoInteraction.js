const fs = require('fs');
module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        console.log('ok')
        if (!interaction.isSelectMenu()) return;
        const id = interaction.customId.split('-');
        console.log(id)
        if (id[0] != 20) return;
        const team = id[1]; 
        fs.readFile("./json/vids.json", (err, res) => {
            if (err) {
                return console.log(err);
            } else { 
                const data = JSON.parse(res);
                const year = interaction.values[0];
                console.log(year)
                for (video of data[team][year]) {
                    interaction.update({embeds: [], components: [], content: video})
                }

            }
        })
    }
}