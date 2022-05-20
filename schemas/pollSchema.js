const { Schema, model } = require('mongoose');

pollSchema = new Schema({
    messageId: String, 
    modalId: String,
    anonymous: Boolean,
    creator: String,
    content: {
        question: String,
        answers: Array,
    },
    responses: [
        {
            userId: String,
            answer: Number,
        },
    ],
})

const pollModel = model('pollData', pollSchema, 'pollData');

module.exports = pollModel; 