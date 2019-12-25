const mongoose = require('mongoose')
const GridFS = require('../gridfs')

const schema = new mongoose.Schema({
    size: Number,
    type: String,

    earlyStage: {
        type: Boolean,
        default: true,
    },
    // Location of the File(unknown state = both false)
    local: {
      type: Boolean,
      default: false,
    },
    remote: {
      type: Boolean,
      default: false,
    },
    storageLevel: {
      type: Number,
      default: 3,
    },

    remoteId: {
        type: String,
        required: true,
        unique: true,
    },
    path: String,
    archive: {
      type: mongoose.Types.ObjectId,
      ref: 'FileArchive',
    },

    gridfs: {
      type: mongoose.Types.ObjectId,
    },

    fileDate: Date,
    created: { type: Date, default: () => new Date(), },
    lastTouched: { type: Date, default: () => new Date(), },
})
schema.post('remove', function (next) {
  console.log('deleting gridfs entry for ', this._id, this.gridfs);

  return GridFS.delete(this.gridfs)
    .then(next)
    .catch(next)
});
module.exports = mongoose.model('File', schema)