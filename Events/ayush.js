module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember) {
        if (newMember.user.id != '697198271281758379') return;
        if (newMember.nickname.toLowerCase() === 'traitor') {
            return;
        } else {
            newMember.setNickname('traitor').catch(err => console.log(err)); 
        }
    }
}