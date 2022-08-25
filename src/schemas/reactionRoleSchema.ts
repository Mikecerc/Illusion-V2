import pkg from "mongoose";
const { Schema, model } = pkg;

const rrSchema = new Schema({
    guildId: String,
    messageId: String,
    channelId: String,
    reactions: Array,
    multiRole: Boolean,
});
const rrModel = model("rrData", rrSchema, "rrData");
export default rrModel;
