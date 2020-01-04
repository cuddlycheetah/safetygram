const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    size: Number,
    index: Array({
        type: mongoose.Types.ObjectId,
        ref: 'File',
    }),

    local: Boolean,
    remote: Boolean,

    created: { type: Date, default: () => new Date(), },
})
module.exports = mongoose.model('FileArchive', schema)