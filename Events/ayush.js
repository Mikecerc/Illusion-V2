module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember) {
        console.log(`new member: ${newMember.nickname}`,`old member: ${oldMember.nickname}`);
        if (newMember.user.id != '697198271281758379') return;
        if (newMember.nickname == null) return newMember.setNickname('Traitor').catch(err => console.log(err));
        if (newMember.nickname.toLowerCase() === 'traitor') {
            return;
        } else {
            newMember.setNickname('Traitor').catch(err => console.log(err)); 
        }
    }
}