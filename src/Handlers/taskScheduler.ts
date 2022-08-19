import { readdirSync } from "fs";
import cron from "node-cron";
export default async (client: any) => {
    readdirSync("./build/tasks/")
        .filter((files) => files.endsWith(".js"))
        .forEach(async (task) => {
            const file = await import(`../tasks/${task}`);
            cron.schedule(file.default.cron, async () => {
                try {
                    file.default.execute(client);
                } catch (e) {
                    console.error(e);
                }
            });
        });
};
