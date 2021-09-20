const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('get robotics/electrical meme!')
        .addStringOption(option =>
            option.setName('meme')
                .setDescription('which meme do you want?')
                .setRequired(true)
                .addChoice('balloon', 'balloon')
                .addChoice('heygirl', 'heygirl')
                .addChoice('sidthesnek', 'sidthesnek')
                .addChoice('armsdeal', 'armsdeal')
                .addChoice('painting', 'painting')
                .addChoice('mr.o meme', 'mromeme')
                .addChoice('falcon500','falcon500')
        ),

    async execute(interaction) {
        let meme = interaction.options.getString('meme');
        switch (meme) {
            case 'balloon':
                console.log(`User: ${interaction.user.username} wanted a meme of ${meme}`);
                return interaction.reply('https://c.tenor.com/VwbfGQlOUqUAAAAC/balloon.gif');
            case 'heygirl':
                console.log(`User: ${interaction.user.username} wanted a meme of ${meme}`);
                return interaction.reply('https://media1.tenor.com/images/0d7ca06c51ce96e11f2de2b50c1dfa7c/tenor.gif?itemid=23104409://c.tenor.com/VwbfGQlOUqUAAAAC/balloon.gif');
            case 'sidthesnek':
                console.log(`User: ${interaction.user.username} wanted a meme of ${meme}`);
                return interaction.reply('https://media1.tenor.com/images/e85b36a911a3f9132991aa7f99e6e0ad/tenor.gif?itemid=23136057');
            case 'armsdeal':
                var photoNum = Math.floor(Math.random() * 2);
                switch (photoNum) {
                    case 0: console.log(`User: ${interaction.user.username} wanted a meme of ${meme}, got photo 1`);
                        return interaction.reply('https://media1.tenor.com/images/726ee18828684e46f125c53d3c8bd4d2/tenor.gif?itemid=23136152');
                    case 1: console.log(`User: ${interaction.user.username} wanted a meme of ${meme}, got photo 2`);
                        return interaction.reply('https://media1.tenor.com/images/65b504caf7552f6bf2a499865dd95f9f/tenor.gif?itemid=23136151');
                }
            case 'painting':
                console.log(`User: ${interaction.user.username} wanted a meme of ${meme}`);
                return interaction.reply('https://media1.tenor.com/images/243a3ae8d1acde66ecc187f47a7ce882/tenor.gif?itemid=23136199');
            case 'mromeme':
                var photoNum = Math.floor(Math.random() * 3);
                switch (photoNum) {
                    case 0: console.log(`User: ${interaction.user.username} wanted a meme of ${meme}, got photo 1`);
                        return interaction.reply('https://media1.tenor.com/images/84bc8595a2797d549a334bac6bf746d5/tenor.gif?itemid=23136231');
                    case 1: console.log(`User: ${interaction.user.username} wanted a meme of ${meme}, got photo 2`);
                        return interaction.reply('https://media1.tenor.com/images/77394bdb0b827a4e7a7414710e09933b/tenor.gif?itemid=23136241');
                    case 2: console.log(`User: ${interaction.user.username} wanted a meme of ${meme}, got photo 3`);
                        return interaction.reply('https://media1.tenor.com/images/161608d2db24c1f0b81688d7222f8d11/tenor.gif?itemid=23136418')
                }
            case 'falcon500': 
                console.log(`User: ${interaction.user.username} wanted a meme of ${meme}`);
                return interaction.reply('https://media1.tenor.com/images/b19b52b7d46588c3b481215253071316/tenor.gif?itemid=23110790');
        
        
        
        
        
        
        
        
        }
    },
};
