const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    type: {
        type: String,
        enum : ['chatTypePrivate','chatTypeBasicGroup', 'chatTypeSupergroup'],
        default: 'chatTypePrivate'
    },
    storageLevel: {
      type: Number,
      default: 3,
    },
    deletionCount: {
        type: Number,
        default: 0,
    },
    created: { type: Date, default: () => new Date(), },
    lastUpdate: { type: Date, default: () => new Date(), },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    basicGroupId: Number,
    supergroupId: Number,
    isChannel: { type: Boolean, default: false },
})
module.exports = mongoose.model('Chat', schema)