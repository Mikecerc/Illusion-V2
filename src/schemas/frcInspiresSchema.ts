import pkg from "mongoose";
const { Schema, model } = pkg;

const frcISchema = new Schema({
    guildSettings: Object,
    latestGuid: String,
});
const frcIModel = model("frcIData", frcISchema, "frcIData");
export default frcIModel;
