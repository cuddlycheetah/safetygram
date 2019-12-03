const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },

    created: { type: Date, default: () => new Date(), },
    lastUpdate: { type: Date, default: () => new Date(), },

    phoneNumber: String,

    isContact: { type: Boolean, default: false },
    ignore: { type: Boolean, default: false },
})
module.exports = mongoose.model('User', schema)