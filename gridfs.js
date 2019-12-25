const config = require('./config')
const mongoose = require('mongoose')
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    dbName: config.mongodbName
}
// GridFS
const { GridFSPromise } = require('gridfs-promise')
const GridFS = new GridFSPromise('safetygram', config.mongodbURI, mongoOptions, 'files')
module.exports = GridFS