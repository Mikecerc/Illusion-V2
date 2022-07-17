import fs from 'fs';
export default {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isSelectMenu()) return;
        const id = interaction.customId.split('-');
        if (id[0] != 20) return;
        const team = id[1]; 
        fs.readFile("./json/vids.json", (err, res) => {
            if (err) {
                return console.log(err);
            } else { 
                const data = JSON.parse(res);
                const year = interaction.values[0];
                for (const video of data[team][year]) {
                    interaction.message.edit({embeds: [], components: [], content: video})
                }

            }
        })
    }
}