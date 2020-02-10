const config = require('../config')
/*const express = require('../node_modules/express')
const bodyParser = require('../node_modules/body-parser')*/
const moment = require('moment'), path = require('path') //, md5 = require('siwi-md5')
/*
const microService = express()
microService.use(bodyParser.json(true))
*/
// MongoDB
const { mongoose, GridFS, Models } = require('../database')
const getNegativeDate = (days) => {
    return moment().subtract(days, 'd').toDate()
}
const purge = async (files) => {
    if (!files) return

    for(let file of files) {
        if (!!file.gridfs) {
            try { await GridFS.delete(file.gridfs) }
            catch (e) { console.error(e) }
            await Models.File.findByIdAndUpdate(file._id, {
                gridfs: null,
                local: false,
                remote: true,
            })
            console.log('deleted', file._id)
        }
    }
}
const main = async () => {
    const totalFiles = await Models.File.find({ gridfs: null }).distinct('_id')
    let col = mongoose.connection.db.collection('files.files')

    col.find().toArray(async function(err, gridFS_Files) {
        gridFS_Files = gridFS_Files.map(x => x._id)
        //let difference = gridFS_Files.filter(x => totalFiles.includes(x));
        for(let file of gridFS_Files) {
            if (!!file) {
                try { await GridFS.delete(file) }
                catch (e) { console.error(e) }
                console.log('deleted', file)
            }
        }
        //console.log(difference)

    });
    console.log('totalFiles', totalFiles)
}
main()