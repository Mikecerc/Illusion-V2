module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.content.includes("<@!425403126670032902>")) {
      await client.users.cache
        .get("565354814037426178")
        .send("Quincy has been pinged!")
        .catch((err) => console.log(err));
    }
  },
};
