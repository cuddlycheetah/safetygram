const config = require('../config')
const express = require('../node_modules/express')
const bodyParser = require('../node_modules/body-parser')
const fs = require('fs'), path = require('path') //, md5 = require('siwi-md5')

const microService = express()
microService.use(bodyParser.json(true))

// MongoDB
const { mongoose, GridFS, Models } = require('../database')

const cronCheck = async () => {
    
    setTimeout(cronCheck, 1000)
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

microService
    /** 
     * Creating a Session
     */
    .get('/status', async (req, res) => {
        let authState = await airgram.api.getAuthorizationState()
        return res.json(authState.response)
    })