const client = require('../../index.js')
module.exports = {
    name: 'guildCreate',
    async execute() {
        setTimeout(() => require('../../Handlers/Commands.js')(client), 5000)
        console.log('the bot has been added to a new guild')
        console.log(client.guilds.cache.map(res => {return res }))
    },
};