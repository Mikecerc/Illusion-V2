module.exports = {
  name: "guildMemberUpdate",
  async execute(oldMember, newMember) {
    if (newMember.user.id == "697198271281758379") {
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
    } else {
        return;
    }
  },
};
