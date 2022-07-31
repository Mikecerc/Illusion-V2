/* eslint-disable no-case-declarations */
/* eslint-disable no-fallthrough */
export default {
    name: 'person',
    description: 'Get a picture of a person',
    options: [
        {
            name: 'person',
            description: 'Which person do you want a picture of',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'Ayush',
                    value: 'ayush',
                },
                {
                    name: 'Sashvat',
                    value: 'sashvat',
                },
                {
                    name: 'Quincy',
                    value: 'quincy',
                },
                {
                    name: 'Robert',
                    value: 'robert',
                },
                {
                    name: 'David',
                    value: 'david',
                },
                {
                    name: 'Eric',
                    value: 'eric',
                },
                {
                    name: 'Abdul',
                    value: 'abdul',
                },
                {
                    name: 'Nate',
                    value: 'nate',
                },
                {
                    name: 'Riley',
                    value: 'riley',
                },
                {
                    name: 'Mr. O Photo',
                    value: 'mrophoto',
                },
                {
                    name: 'Sid',
                    value: 'sid',
                },
                {
                    name: 'Jerry',
                    value: 'jerry',
                },
            ],

        },
    ],

    execute(interaction: any) {
        const person = interaction.options.getString('person');
        switch (person) {
            case 'ayush':
                console.log(`User: ${interaction.user.username} wanted a picture of ${person}`);
                return interaction.reply('https://media1.tenor.com/images/b797ad7ca88bcaaf36a91f23a57d244a/tenor.gif?itemid=23136058');
            case 'sashvat':
                console.log(`User: ${interaction.user.username} wanted a picture of ${person}`);
                return interaction.reply('https://media1.tenor.com/images/4109215d90dd64ed6c012b1a4de9cd06/tenor.gif?itemid=23136112');
            case 'quincy':
                console.log(`User: ${interaction.user.username} wanted a picture of ${person}`);
                return interaction.reply('https://media1.tenor.com/images/d53c199634f6a756a079149053946163/tenor.gif?itemid=23136127');
            case 'robert':
                console.log(`User: ${interaction.user.username} wanted a picture of ${person}`);
                return interaction.reply('https://media1.tenor.com/images/75ba376abf8890dc2b73a1af238dda2e/tenor.gif?itemid=23136141');
            case 'david':
                const davidPhotoNum = Math.floor(Math.random() * 2);
                switch (davidPhotoNum) {
                    case 0:
                        console.log(`User: ${interaction.user.username} wanted a photo of ${person}, got photo 1`);
                        return interaction.reply('https://media1.tenor.com/images/d5d3a332e2451a067644eae396652812/tenor.gif?itemid=23136155');
                    case 1:
                        console.log(`User: ${interaction.user.username} wanted a photo of ${person}, got photo 2`);
                        return interaction.reply('https://media1.tenor.com/images/40527176c6216cd1486b63cef71fdc5e/tenor.gif?itemid=23136169');
                }
            case 'eric':
                console.log(`User: ${interaction.user.username} wanted a picture of ${person}`);
                return interaction.reply('https://media1.tenor.com/images/160e84e1e0487c2de206012b49d20123/tenor.gif?itemid=23136165');
            case 'abdul':
                console.log(`User: ${interaction.user.username} wanted a picture of ${person}`);
                return interaction.reply('https://media1.tenor.com/images/0294712a2e59f00b45d7c9326443a8af/tenor.gif?itemid=23136267');
            case 'nate':
                const natePhotoNum = Math.floor(Math.random() * 7);
                switch (natePhotoNum) {
                    case 0:
                        console.log(`User: ${interaction.user.username} wanted a picture of ${person}, got photo 1`);
                        return interaction.reply('https://media1.tenor.com/images/33e3855c426deb81a69cb6cab9c42624/tenor.gif?itemid=23136282');
                    case 1:
                        console.log(`User: ${interaction.user.username} wanted a picture of ${person}, got photo 2`);
                        return interaction.reply('https://media1.tenor.com/images/9be872c7d65c1047fbce155317a1924d/tenor.gif?itemid=23136541');
                    case 2:
                        console.log(`User: ${interaction.user.username} wanted a picture of ${person}, got photo 3`);
                        return interaction.reply('https://media1.tenor.com/images/320380ba9c432fa64ddf0d2ee290b274/tenor.gif?itemid=23136631');
                    case 3:
                        console.log(`User: ${interaction.user.username} wanted a picture of ${person}, got photo 4`);
                        return interaction.reply('https://media1.tenor.com/images/88563002de7c3321d0565b41aece0a5c/tenor.gif?itemid=23136629');
                    case 4:
                        console.log(`User: ${interaction.user.username} wanted a picture of ${person}, got photo 5`);
                        return interaction.reply('https://media1.tenor.com/images/0ca461b75291d6b671e69ab06242df9e/tenor.gif?itemid=23136628');
                    case 5:
                        console.log(`User: ${interaction.user.username} wanted a picture of ${person}, got photo 6`);
                        return interaction.reply('https://media1.tenor.com/images/828cdb8afa09f598f910bd74f75d1cf6/tenor.gif?itemid=23136627');
                    case 6:
                        console.log(`User: ${interaction.user.username} wanted a picture of ${person}, got photo 7`);
                        return interaction.reply('https://media1.tenor.com/images/48c4071daea57b713780a22e76e3b2de/tenor.gif?itemid=23136630');
                    case 7:
                        console.log(`User: ${interaction.user.username} wanted a picture of ${person}, got photo 8`);
                        return interaction.reply('https://media1.tenor.com/images/116d982966d14467903bb92e17ffbc52/tenor.gif?itemid=23136710');
                    case 8:
                        console.log(`User: ${interaction.user.username} wanted a picture of ${person}, got photo 9`);
                        return interaction.reply('https://media1.tenor.com/images/1bbbbf0479f2e6a0c76ce0d50821abce/tenor.gif?itemid=23136706');
                    case 9:
                        console.log(`User: ${interaction.user.username} wanted a picture of ${person}, got photo 10`);
                        return interaction.reply('https://media1.tenor.com/images/1ce15e32d8a366f1f6dbfec72dbaac45/tenor.gif?itemid=23136705');
                    case 10:
                        console.log(`User: ${interaction.user.username} wanted a picture of ${person}, got photo 11`);
                        return interaction.reply('https://media1.tenor.com/images/368b8ff4d6531fdd29e387401ab54738/tenor.gif?itemid=23136704');

                }
            case 'riley':
                console.log(`User: ${interaction.user.username} wanted a picture of ${person}`);
                return interaction.reply('https://media1.tenor.com/images/1b00d4480b666784108ad81dbe99c0f6/tenor.gif?itemid=23136375');
            case 'mrophoto':
                const mroPhotoNum = Math.floor(Math.random() * 3);
                switch (mroPhotoNum) {
                    case 0:
                        console.log(`User: ${interaction.user.username} wanted a photo of ${person}, got photo 1`);
                        return interaction.reply('https://media1.tenor.com/images/80b44e5231d031aef1956924d1124bf2/tenor.gif?itemid=23136177');
                    case 1:
                        console.log(`User: ${interaction.user.username} wanted a photo of ${person}, got photo 2`);
                        return interaction.reply('https://media1.tenor.com/images/265ded6b03081cfbfec6fb28fd58f66e/tenor.gif?itemid=23136178');
                    case 2:
                        console.log(`User: ${interaction.user.username} wanted a photo of ${person}, got photo 3`);
                        return interaction.reply('https://media1.tenor.com/images/260aa10fb1cc8bed3c4e1af1c90b2c29/tenor.gif?itemid=23136440');
                }
            case 'sid':
                const sidPhotoNum = Math.floor(Math.random() * 2);
                switch (sidPhotoNum) {
                    case 0:
                        console.log(`User: ${interaction.user.username} wanted a photo of ${person}, got photo 1`);
                        return interaction.reply('https://media1.tenor.com/images/da8fa47483a12fb646b47c8f69ebbbfc/tenor.gif?itemid=23136513');
                    case 1:
                        console.log(`User: ${interaction.user.username} wanted a photo of ${person}, got photo 2`);
                        return interaction.reply('https://media1.tenor.com/images/92162445146e5a1bdc4dc52ee6c1a87e/tenor.gif?itemid=23136512');
                }
            case 'jerry':
                const jerryPhotoNum = Math.floor(Math.random() * 2);
                switch (jerryPhotoNum) {
                    case 0:
                        console.log(`User: ${interaction.user.username} wanted a photo of ${person}, got photo 1`);
                        return interaction.reply('https://media1.tenor.com/images/1ba00f7fbba527810a4cd9fc4a62f25a/tenor.gif?itemid=23136667');
                    case 1:
                        console.log(`User: ${interaction.user.username} wanted a photo of ${person}, got photo 2`);
                        return interaction.reply('https://media1.tenor.com/images/0271feed531611a273421ff7d6f911f3/tenor.gif?itemid=23136666');
                }
        }
    },
};