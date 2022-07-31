export default {
  name: "guildMemberUpdate",
  async execute(oldMember: any, newMember: any) {
    /**if (newMember.user.id == "697198271281758379") {
      if (newMember.nickname == null)
        return newMember
          .setNickname("Traitor")
          .catch((err) => console.log(err));
      if (newMember.nickname.toLowerCase() === "traitor") {
        return;
      } else {
        newMember.setNickname("Traitor").catch((err) => console.log(err));
      }
    } else if (newMember.user.id == "692559110675103784") {
        if (newMember.nickname == null)
        return newMember
          .setNickname("Disgrace to humanity")
          .catch((err) => console.log(err));
      if (newMember.nickname.toLowerCase() === "disgrace to humanity") {
        return;
      } else {
        newMember.setNickname("Disgrace to humanity").catch((err) => console.log(err));
      }
    } else if (newMember.user.id == "406629388059410434") {
      if (newMember.nickname == null)
      return newMember
        .setNickname("Kylie")
        .catch((err) => console.log(err));
    if (newMember.nickname.toLowerCase() === "kylie") {
      return;
    } else {
      newMember.setNickname("Kylie").catch((err) => console.log(err));
      const guild = newMember.guild;
        const channel = await guild.channels.cache.find(
          (c) => c.id === '692794471489732632'
        );
      channel.send('me when kyle thinks he can change his nickname')
    }
  } else {
        return;
    }*/
  },
};
