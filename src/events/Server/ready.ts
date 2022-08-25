import { ActivityType } from "discord.js";
export default {
    name: "ready",
    execute(client: any) {
        console.log("The client is ready :)");
        client.user.setActivity("Recycle Rush Videos", { type: ActivityType.Watching });
    },
};
