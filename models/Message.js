const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },

  peer: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Chat',
  },
  from: {
    type: mongoose.Types.ObjectId,
    //required: true,
    refPath: 'fromType',
  },
  fromType: {
    type: String,
    //required: true,
    enum: ['Chat', 'User'],
  },

  isOutgoing: Boolean,

  replyToMessageId: Number,
  mediaAlbumId: String,

  forwardedName: String,
  forwardedFrom: {
    type: mongoose.Types.ObjectId,
    ref: 'Chat',
  },
  forwardedDate: Date,
  forwardedType: {
    type: String,
    enum: [
      'messageForwardOriginUser',
      'messageForwardOriginHiddenUser',
      'messageForwardOriginChannel'
    ],
  },
  text: { type: String, text: true },
  content: Object,
  contentFiles: Array({
    type: mongoose.Types.ObjectId,
    ref: 'File',
  }),

  edits: Array({
    type: Object
  }),

  authorSignature: String,
  views: Number,

  createdAt: { type: Date, default: () => new Date(), index: true, },
  deleted: { type: Boolean, default: false, },
  deletedAt: Date,
})

module.exports = mongoose.model('Message', schema)
