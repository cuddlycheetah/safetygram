const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    chatId: {
        type: Number,
    },
    userId: {
        type: Number,
    },
    ignoreMessages: {
        type: Boolean,
        default: true,
    },
    ignoreImages: {
        type: Boolean,
        default: false,
    },
    ignoreVideos: {
        type: Boolean,
        default: false,
    },
})
module.exports = mongoose.model('IgnoreRule', schema)