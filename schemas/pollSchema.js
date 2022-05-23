const { Schema, model } = require('mongoose');

pollSchema = new Schema({
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

const pollModel = model('pollData', pollSchema, 'pollData');

module.exports = pollModel; 