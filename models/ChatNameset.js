const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    chat: {
        type: mongoose.Types.ObjectId,
        ref: 'Chat',
        required: true,
    },
    created: { type: Date, default: () => new Date(), },
    hash: String,
    name: String,
    photo: {
        type: mongoose.Types.ObjectId,
        ref: 'File',
    },
})
module.exports = mongoose.model('ChatNameset', schema)