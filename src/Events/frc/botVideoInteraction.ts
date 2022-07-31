import fs from 'fs';
export default {
    name: 'interactionCreate',
    async execute(interaction: any) {
        if (!interaction.isSelectMenu()) return;
        const id = interaction.customId.split('-');
        if (id[0] != 20) return;
        const team = id[1]; 
        fs.readFile("./data/json/vids.json", (err, res) => {
            if (err) {
                return console.log(err);
            } else { 
                const data = JSON.parse(res.toString());
                const year = interaction.values[0];
                for (const video of data[team][year]) {
                    interaction.message.edit({embeds: [], components: [], content: video})
                }

            }
        })
    }
}