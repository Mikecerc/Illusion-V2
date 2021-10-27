/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
module.exports = {
    name: 'meme',
    description: 'Get a electrical/robotics meme!',
    options: [
        {
            name: 'meme',
            description: 'Which meme do you want?',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'Balloon',
                    value: 'balloon',
                },
                {
                    name: 'Heygirl',
                    value: 'heygirl',
                },
                {
                    name: 'Sidthesnek',
                    value: 'sidthesnek',
                },
                {
                    name: 'Armsdeal',
                    value: 'armsdeal',
                },
                {
                    name: 'Painting',
                    value: 'painting',
                },
                {
                    name: 'Mr. O meme',
                    value: 'mromeme',
                },
                {
                    name: 'Falcon 500',
                    value: 'falcon500',
                },
            ],
        },
    ],

    execute(interaction) {
        const meme = interaction.options.getString('meme');
        interaction.followUp('done!')
        switch (meme) {
            case 'balloon':
                console.log(`User: ${interaction.user.username} wanted a meme of ${meme}`);
                return interaction.channel.send('https://c.tenor.com/VwbfGQlOUqUAAAAC/balloon.gif');
            case 'heygirl':
                console.log(`User: ${interaction.user.username} wanted a meme of ${meme}`);
                return interaction.channel.send('https://media1.tenor.com/images/0d7ca06c51ce96e11f2de2b50c1dfa7c/tenor.gif?itemid=23104409://c.tenor.com/VwbfGQlOUqUAAAAC/balloon.gif');
            case 'sidthesnek':
                console.log(`User: ${interaction.user.username} wanted a meme of ${meme}`);
                return interaction.channel.send('https://media1.tenor.com/images/e85b36a911a3f9132991aa7f99e6e0ad/tenor.gif?itemid=23136057');
            case 'armsdeal':
                const photoNum = Math.floor(Math.random() * 2);
                switch (photoNum) {
                    case 0: console.log(`User: ${interaction.user.username} wanted a meme of ${meme}, got photo 1`);
                        return interaction.channel.send('https://media1.tenor.com/images/726ee18828684e46f125c53d3c8bd4d2/tenor.gif?itemid=23136152');
                    case 1: console.log(`User: ${interaction.user.username} wanted a meme of ${meme}, got photo 2`);
                        return interaction.channel.send('https://media1.tenor.com/images/65b504caf7552f6bf2a499865dd95f9f/tenor.gif?itemid=23136151');
                }
            case 'painting':
                console.log(`User: ${interaction.user.username} wanted a meme of ${meme}`);
                return interaction.channel.send('https://media1.tenor.com/images/243a3ae8d1acde66ecc187f47a7ce882/tenor.gif?itemid=23136199');
            case 'mromeme':
                const mrophotoNum = Math.floor(Math.random() * 3);
                switch (mrophotoNum) {
                    case 0: console.log(`User: ${interaction.user.username} wanted a meme of ${meme}, got photo 1`);
                        return interaction.channel.send('https://media1.tenor.com/images/84bc8595a2797d549a334bac6bf746d5/tenor.gif?itemid=23136231');
                    case 1: console.log(`User: ${interaction.user.username} wanted a meme of ${meme}, got photo 2`);
                        return interaction.channel.send('https://media1.tenor.com/images/77394bdb0b827a4e7a7414710e09933b/tenor.gif?itemid=23136241');
                    case 2: console.log(`User: ${interaction.user.username} wanted a meme of ${meme}, got photo 3`);
                        return interaction.channel.send('https://media1.tenor.com/images/161608d2db24c1f0b81688d7222f8d11/tenor.gif?itemid=23136418');
                }
            case 'falcon500':
                console.log(`User: ${interaction.user.username} wanted a meme of ${meme}`);
                return interaction.channel.send('https://media1.tenor.com/images/b19b52b7d46588c3b481215253071316/tenor.gif?itemid=23110790');
        }
    },
};