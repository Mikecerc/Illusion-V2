import rrModel from "../../schemas/reactionRoleSchema.js";

export default {
    name: "ready",
    async execute(client) {
        syncDb(client);
    },
};

async function syncDb(client) {
    const res = await rrModel.find();
    let guild, channel, msg;
    for (const rr of res) {
        try {
            guild = await client.guilds.fetch(rr.guildId);
        } catch (e) {
            return await rrModel.deleteMany({ guildId: rr.guildId });
        }
        try {
            channel = await guild.channels.fetch(rr.channelId);
        } catch (e) {
            return await rrModel.deleteMany({
                guildId: rr.guildId,
                channelId: rr.channelId,
            });
        }
        try {
            msg = await channel.messages.fetch(rr.messageId);
        } catch (e) {
            return await rrModel.deleteOne({
                guildId: rr.guildId,
                channelId: rr.channelId,
                messageId: rr.messageId,
            });
        }

        const msgReactions = msg.reactions.cache.map((r) => r);
        let finalArray = [];
        for (const reaction in rr.reactions) {
            let exists;
            for (const msgReaction of msgReactions) {
                if (
                    msgReaction.emoji.identifier ==
                        rr.reactions[reaction].reactionRole.emoji &&
                    msgReaction.me == true
                ) {
                    exists = true;
                }
            }
            if (exists) continue;
            rr.reactions[reaction] = "placeholder";
        }
        for (const reaction of rr.reactions) {
            if (reaction != "placeholder") finalArray.push(reaction);
        }
        rr.reactions = finalArray;
        await rr.save();

        if (rr.reactions.length <= 0) {
            return await rrModel.deleteOne({
                guildId: rr.guildId,
                channelId: rr.channelId,
                messageId: rr.messageId,
            });
        } else {
            if (!Object.keys(client.reactionRoles).includes(guild.id))
                client.reactionRoles[guild.id] = {};
            if (
                !Object.keys(client.reactionRoles[guild.id]).includes(
                    channel.id
                )
            )
                client.reactionRoles[guild.id][channel.id] = [];
            if (!Array.isArray(client.reactionRoles[guild.id][channel.id]))
                client.reactionRoles[guild.id][channel.id] = [];
            if (client.reactionRoles[guild.id][channel.id].includes(msg.id))
                return;
            client.reactionRoles[guild.id][channel.id].push(msg.id);
        }
    }
}
export { syncDb };