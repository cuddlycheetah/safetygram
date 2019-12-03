const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    created: { type: Date, default: () => new Date(), },
    hash: String,
    bio: String,
})
module.exports = mongoose.model('UserInfo', schema)