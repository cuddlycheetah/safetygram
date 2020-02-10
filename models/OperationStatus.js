const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    type: String,

    progress: Number,
    cancel: Boolean,
    finished: Boolean,

    text: String,
    error: String,
    link: String,
})
module.exports = mongoose.model('OperationStatus', schema)