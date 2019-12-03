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
mongoose.connect(config.mongodbURI, mongoOptions)
/*.then(() => {
    GridFS.CONNECTION = mongoose.connection
})*/
mongoose.Promise = global.Promise
const Models = require('./models')
module.exports = { mongoose, Models, GridFS }