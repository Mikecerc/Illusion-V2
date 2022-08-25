import child_process from "child_process";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import os from "node:os";

export default {
    data: new SlashCommandBuilder().setName("weather").setDescription("retrieves weather data from a weather station near P-CEP"),
    async execute(interaction: any) {
        interaction.deferReply();
        const opSys = os.platform();
        let pyString: string;
        if (opSys.toString() == "win32") {
            pyString = "py";
        } else {
            pyString = "python3";
        }
        const process = child_process.spawn(pyString, ["./src/Commands/weather/parse.py"]);
        process.stderr.on("data", (data) => {
            console.log(String.fromCharCode.apply(null, data));
        });

        process.stdout.on("data", (data) => {
            const str = String.fromCharCode.apply(null, data).replace(/\s/g, "").replace("b", "").replace("'", "");
            const values = str.split("-");

            const temp = values[0];
            const realFeel = values[1];
            const windDir = values[2];
            const windSpeed = values[3];
            const dewPoint = values[4];
            const precipitation = values[5];
            const totalPrecipitation = values[8];
            const pressure = values[6];
            const humidity = values[7];

            let color = null;
            if (parseInt(realFeel) < 40) {
                color = "Blue";
            } else if (parseInt(realFeel) > 80) {
                color = "Red";
            } else {
                color = "Green";
            }
            const embed = new EmbedBuilder()
                .setColor(color)
                .setTitle("Current Weather Data")
                .setDescription("This weather Data was retrieved just now from a weather station right next to P-CEP")
                .addFields(
                    {
                        name: "Temperature",
                        value: `Temperature: ${temp}\nFeels Like: ${realFeel.replace("FeelsLike", "")}F`,
                    },
                    {
                        name: "Dew Point",
                        value: `Dew Point: ${dewPoint}°F`,
                    },
                    {
                        name: "Wind",
                        value: `Direction: ${windDir}\nWind Speed/Gust: ${windSpeed}`,
                    },
                    {
                        name: "Pressure",
                        value: `Pressure: ${pressure} in`,
                    },
                    {
                        name: "Precipitation",
                        value: `Precipitation Rate: ${precipitation} in/hr\nTotal Precipitation: ${totalPrecipitation} in`,
                    },
                    {
                        name: "Humidity",
                        value: `Humidity: ${humidity} %`,
                    }
                );

            interaction.followUp({ embeds: [embed] });
        });
    },
};
