import pkg from 'mongoose';
const { Schema, model } = pkg;
//create mongoose schema (class)
const pollSchema = new Schema({
    messageId: String, 
    anonymous: Boolean,
    multipleResponse: Boolean,
    creator: String,
    serverId: String,
    content: {
        question: String,
        answers: Array,
    },
    responses: [
        {
            userId: String,
            answers: Array,
        },
    ],
})
//export schema as a mongoose model
const pollModel = model('pollData', pollSchema, 'pollData');

export default pollModel;