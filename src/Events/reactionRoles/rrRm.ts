import rrModel from "../../schemas/reactionRoleSchema.js";
import { syncDb } from "./messageFetch.js";
export default {
    name: "messageReactionRemove",
    async execute(reaction: any, user: { id: number }, client: any) {
        syncDb(client);
        if (!Object.keys(client.reactionRoles).includes(reaction.message.guildId)) return;
        if (!Object.keys(client.reactionRoles[reaction.message.guildId]).includes(reaction.message.channelId)) return;
        if (!Array.isArray(client.reactionRoles[reaction.message.guildId][reaction.message.channelId])) return;
        if (!client.reactionRoles[reaction.message.guildId][reaction.message.channelId].includes(reaction.message.id)) return;
        if (!client.reactionRoles[reaction.message.guildId][reaction.message.channelId].includes(reaction.message.id)) return;
        if (user.id == client.user.id) return;
        if (!reaction.me) return syncDb(client);
        const res = await rrModel.findOne({
            guildId: reaction.message.guildId,
            messageId: reaction.message.id,
            channelId: reaction.message.channelId,
        });
        if (!res) return;
        for (const rr of res.reactions) {
            if (rr.reactionRole.emoji != reaction.emoji.identifier) continue;
            try {
                const guild = await client.guilds.fetch(reaction.message.guildId);
                const role = await guild.roles.fetch(rr.reactionRole.role);
                const member = await guild.members.fetch(user.id);
                member.roles.remove(role);
            } catch (e) {
                console.log(e);
            }
        }
        syncDb(client);
    },
};
