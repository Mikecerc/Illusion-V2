import { readdirSync } from "fs";
export default async (client: any) => {
    //list all sub-folders in events folder
    const eventFolders = readdirSync("./dist/events");
    for (const folder of eventFolders) {
        //lists files in each of the folders
        const eventFiles = readdirSync(`./dist/events/${folder}`).filter((files) => files.endsWith(".js"));
        for (const file of eventFiles) {
            // imports each file
            const eventFile = await import(`../events/${folder}/${file}`);
            const event = eventFile.default;
            //determines the collector type for each event and creates an event collector. Upon the event, the execute() object in the event files will be run.
            if (event.once) {
                client.once(event.name, (...args: any) => {
                    try {
                        event.execute(...args, client);
                    } catch (error) {
                        console.error(error);
                    }
                });
            } else {
                client.on(event.name, (...args: any) => {
                    try {
                        event.execute(...args, client);
                    } catch (error) {
                        console.error(error);
                    }
                });
            }
        }
    }
};
