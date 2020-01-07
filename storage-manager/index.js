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
const cronCheck = async () => {
    const now = new Date()
    const storageLevelTime = {
        0: (await Models.Option.findOne({ key: 'storageManager.keepTime.privateChats' })).value,
        1: (await Models.Option.findOne({ key: 'storageManager.keepTime.basicGroupChats' })).value,
        2: (await Models.Option.findOne({ key: 'storageManager.keepTime.superGroups' })).value,
        3: (await Models.Option.findOne({ key: 'storageManager.keepTime.channels' })).value
    }
    const exceedingDates = {
        0: storageLevelTime[0] >= 0 ? getNegativeDate(storageLevelTime[0]) : false,
        1: storageLevelTime[1] >= 0 ? getNegativeDate(storageLevelTime[1]) : false,
        2: storageLevelTime[2] >= 0 ? getNegativeDate(storageLevelTime[2]) : false,
        3: storageLevelTime[3] >= 0 ? getNegativeDate(storageLevelTime[3]) : false,
    }
    const exceedingFiles = {
        0: exceedingDates[0] ? (await Models.File.find({ storageLevel: 0, remote: true, local: true, created: { $lt: exceedingDates[0] }, type: { $ne: "chatPhoto" } })) : false,
        1: exceedingDates[1] ? (await Models.File.find({ storageLevel: 1, remote: true, local: true, created: { $lt: exceedingDates[1] }, type: { $ne: "chatPhoto" } })) : false,
        2: exceedingDates[2] ? (await Models.File.find({ storageLevel: 2, remote: true, local: true, created: { $lt: exceedingDates[2] }, type: { $ne: "chatPhoto" } })) : false,
        3: exceedingDates[3] ? (await Models.File.find({ storageLevel: 3, remote: true, local: true, created: { $lt: exceedingDates[3] }, type: { $ne: "chatPhoto" } })) : false,
    }
    await purge(exceedingFiles[0])
    await purge(exceedingFiles[1])
    await purge(exceedingFiles[2])
    await purge(exceedingFiles[3])

    setTimeout(cronCheck, 60 * 1000)
}

const main = async () => {
    if ((await Models.Option.count({ key: 'storageManager.keepTime.privateChats' })) === 0) {
        Models.Option.create({
            key: 'storageManager.keepTime.privateChats',
            type: 'keepTimeDays',
            value: -1,
            default: -1,
            desc: 'The time in days, how long files should be kept for Private (& Secret) Chats'
        })
    }
    if ((await Models.Option.count({ key: 'storageManager.keepTime.basicGroupChats' })) === 0) {
        Models.Option.create({
            key: 'storageManager.keepTime.basicGroupChats',
            type: 'keepTimeDays',
            value: 7,
            default: 7,
            desc: 'The time in days, how long files should be kept for Basic Groups(non public)'
        })
    }
    if ((await Models.Option.count({ key: 'storageManager.keepTime.superGroups' })) === 0) {
        Models.Option.create({
            key: 'storageManager.keepTime.superGroups',
            type: 'keepTimeDays',
            value: 7,
            default: 7,
            desc: 'The time in days, how long files should be kept for Super Groups(public groups)'
        })
    }
    if ((await Models.Option.count({ key: 'storageManager.keepTime.channels' })) === 0) {
        Models.Option.create({
            key: 'storageManager.keepTime.channels',
            type: 'keepTimeDays',
            value: 1,
            default: 1,
            desc: 'The time in days, how long files should be kept for Channels'
        })
    }
    cronCheck()
}
main()