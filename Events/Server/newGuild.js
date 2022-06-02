const client = require('../../index.js')
module.exports = {
    name: 'guildCreate',
    async execute() {
        require('../../Handlers/Commands.js')(client)
    },
};