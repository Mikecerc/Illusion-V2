import { SlashCommandBuilder, InteractionResponse, EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder().setName("scramble").setDescription("Scramble the queue"),
    async execute(interaction, client) {
        await interaction.deferReply();
        if (!interaction.member.voice.channel) {
            return await interaction.followUp({
                content: "You must be in a voice channel to use this command",
            });
        }
        let subscription = client.subscriptions.get(interaction.guildId);
        if (subscription) {
            subscription.queue = shuffle(subscription.queue);
            await interaction.followUp({ embeds: [new EmbedBuilder().setColor('Orange').setDescription("🔀The queue has been scrambled")] })
        } else {
            await interaction.followUp("Not playing in this server!");
        }
    }
}
function shuffle(arr: any[]) { // randomly rearanges the items in an array
    const result = [];
    for (let i = arr.length-1; i >= 0; i--) {
      // picks an integer between 0 and i:
      const r = Math.floor(Math.random()*(i+1));   // NOTE: use a better RNG if cryptographic security is needed
      // inserts the arr[i] element in the r-th free space in the shuffled array:
      for(let j = 0, k = 0; j <= arr.length-1; j++) {
        if(result[j] === undefined) {
          if(k === r) {
            result[j] = arr[i];    // NOTE: if array contains objects, this doesn't clone them! Use a better clone function instead, if that is needed. 
            break;
          }
          k++;
        }
      }
    }
    return result;
  }
