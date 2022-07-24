import child_process from "child_process";
import { MessageEmbed } from 'discord.js';

export default {
    name: 'weather',
    description: 'retrieves weather data from a weather station near pcep',

    async execute(interaction) {
        interaction.deferReply();
        const process = child_process.spawn('python3', ["./Commands/weather/parse.py"]);

        process.stderr.on('data', (data) => {
            console.log(String.fromCharCode.apply(null, data))
        })

        process.stdout.on('data', (data) => {
            const str = String.fromCharCode.apply(null, data).replace(/\s/g, '').replace('b', '').replace("'",'');
            console.log(str);

            const values = str.split('-')

            const temp = values[0]
            const realFeel = values[1]
            const windDir = values[2]
            const windSpeed = values[3]
            const dewPoint = values[4]
            const precipitation = values[5]
            const totalPrecipitation = values[8]
            const pressure = values[6]
            const humidity = values[7]

            let color = null
            if (realFeel < 40) {
                color = 'BLUE';
            } else if (realFeel > 80) {
                color = 'RED';
            } else {
                color = 'GREEN';
            }
            const embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Current Weather Data')
                .setDescription('This weather Data was retrieved just now from a weather station right next to P-CEP')
                .addFields(
                    {
                        name: "Temperature",
                        value: `Temperature: ${temp}\nFeels Like: ${realFeel.replace('FeelsLike','')}F`,
                    },
                    {
                        name: "Dew Point",
                        value: `Dew Point: ${dewPoint}°F`
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
                    },
                );

            interaction.followUp({ embeds: [embed] });

        });

        process.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    }
}