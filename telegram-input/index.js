const config = require('../config')
const express = require('../node_modules/express')
const bodyParser = require('../node_modules/body-parser')

const microService = express()
microService.use(bodyParser.json(true))

// MongoDB
const { mongoose, GridFS, Models } = require('../database')


const fs = require('fs'), path = require('path')


const md5 = require('siwi-md5')
const { Airgram, Auth, prompt } = require('airgram')
const airgram = new Airgram({
    apiId: config.telegramInput.apiId,
    apiHash: config.telegramInput.apiHash,

    databaseDirectory: './db/',
    useFileDatabase: false,
    useChatInfoDatabase: true,

    //logVerbosityLevel: 2,

    deviceModel: 'by CuddlyCheetah',
    systemVersion: '@Safetygram',
    applicationVersion: '2.0.0',

    useSecretChats: true,
})

airgram.on('updateUser', async ({ update }) => {
    // if (!!update.user && !!update.user.type && update.user.type._ !== 'userTypeRegular') return console.error('User ignored, because not userTypeRegular', update.user.type._)
    //console.log(update)
    let userCount = await Models.User.count({ id: update.user.id })
    let userOID = null
    if (userCount === 0) {
        const createdUsed = await Models.User.create({
            id: update.user.id,
            phoneNumber: update.user.phoneNumber,
        })
        userOID = createdUsed._id
    } else {
        const foundUser = await Models.User.findOne({ id: update.user.id })
        userOID = foundUser._id
    }
    let uniqueName = `${update.user.firstName}${update.user.lastName}${update.user.username}`
    let hash = await md5.sign(uniqueName)

    let userNameSet = await Models.UserNameset.find({
        user: userOID,
    })
    .sort({ created: -1 })
    .limit(1)

    if (userNameSet.length === 1 && userNameSet[0].hash !== hash) {
        userNameSet = []
    }
    if (userNameSet.length === 0) {
        await Models.UserNameset.create({
            user: userOID,
            firstName: update.user.firstName,
            lastName: update.user.lastName,
            username: update.user.username,
            hash: hash
        })
    }
    await refreshChatInfo(update.user.id)
})
airgram.on('updateUserFullInfo', async ({ update }) => {
    const foundUser = await Models.User.findOne({ id: update.userId })
    if (!!foundUser) {
        const bio = (!!update.userFullInfo && !!update.userFullInfo.bio)
            ? update.userFullInfo.bio
            : '';
        let hash = await md5.sign(bio)

        let userInfoSet = await Models.UserInfo.find({
            user: foundUser._id,
        })
        .sort({ created: -1 })
        .limit(1)

        if (userInfoSet.length === 1 && userInfoSet[0].hash !== hash) {
            userInfoSet = []
        }
        if (userInfoSet.length === 0) {
            await Models.UserInfo.create({
                user: foundUser._id,
                bio: bio,
                hash: hash
            })
        }
    }
    await refreshChatInfo(update.userId)
})

/*
because chats only exists with mesages, i dont need this anymore

airgram.on('updateNewChat', async ({ update }) => {
    //console.log(update)
    await refreshChatInfo(update.chat.id)
})*/
async function resolveUserIDToOID(userId) {
    let userCount = await Models.User.count({ id: userId })
    let userOID = null
    if (userCount === 0) {
        let airgramInfo = await airgram.api.getUser({ userId })
        //if (!!airgramInfo.response && !!airgramInfo.response.type && airgramInfo.response.type._ !== 'userTypeRegular') return console.error('User ignored, because not userTypeRegular', airgramInfo.response.type._)
        const createdUser = await Models.User.create({
            id: userId,
            phoneNumber: airgramInfo.response.phoneNumber,
        })
        userOID = createdUser._id
    } else {
        const foundUser = await Models.User.findOne({ id: userId })
        userOID = foundUser._id
    }
    return userOID
}
async function resolveChatIDToOID(chatId) {
    let chatCount = await Models.Chat.count({ id: chatId })
    let chatOID = null
    if (chatCount === 0) {
        let airgramInfo = await airgram.api.getChat({ chatId })
        console.log('resolveChatIDToOID', airgramInfo.response)
        //if (!!airgramInfo.response && !!airgramInfo.response.type && airgramInfo.response.type._ !== 'userTypeRegular') return console.error('User ignored, because not userTypeRegular', airgramInfo.response.type._)
        const createdChat = await refreshChatInfo(chatId)
        chatOID = createdChat
    } else {
        const foundChat = await Models.Chat.findOne({ id: chatId })
        chatOID = foundChat._id
    }
    return chatOID
}
async function refreshChatInfo(chatId) {
    let chatData = await airgram.api.getChat({ chatId: chatId })
    chatData = chatData.response
    if (await Models.IgnoreRule.count({ chatId }) > 0) return; // ! Ignorieren
    if (chatData._ === 'error') {
        /*if (chatData.code === 6) {
            await Models.IgnoreRule.create({ chatId })
        }
        throw JSON.stringify(chatData, null, '\t')*/
        return
    }

    //console.log(chatData)
    let chatEntry = await Models.Chat.findOne({ id: chatData.id })
    if (!chatEntry) {
        const newChatData = {
            id: chatData.id,
            type: chatData.type._,
        }
        switch (chatData.type._) {
            case 'chatTypePrivate':
                newChatData.storageLevel = 0
                newChatData.user = await resolveUserIDToOID(chatData.type.userId)
                break;
            case 'chatTypeBasicGroup':
                newChatData.storageLevel = 1
                newChatData.basicGroupId = chatData.type.basicGroupId
                break;
            case 'chatTypeSupergroup':
                newChatData.supergroupId = chatData.type.supergroupId
                newChatData.isChannel = chatData.type.isChannel
                newChatData.storageLevel = 2 + (!!newChatData.isChannel)
                break;
        }
        chatEntry = await Models.Chat.create(newChatData)
        console.log('created chat')
    }
    let chatPhoto = !!chatData.photo
        ? chatData.photo.big.remote.id
        : ''
    let uniqueName = `${chatData.title}${chatPhoto}`
    let hash = await md5.sign(uniqueName)

    let chatNameSet = await Models.ChatNameset.find({
        chat: chatEntry._id,
    })
    .sort({ created: -1 })
    .limit(1)

    if (chatNameSet.length === 1 && chatNameSet[0].hash !== hash) {
        chatNameSet = []
    }
    if (chatNameSet.length === 0) {
        await Models.ChatNameset.create({
            chat: chatEntry._id,
            name: chatData.title,
            photo: chatPhoto,
            hash: hash
        })
    }
    return chatEntry._id;
}
async function syncWTG() {
    const me = await airgram.api.getMe()
    //console.log(me)

    const contacts = await airgram.api.getContacts()
    let chatList = (await airgram.api.getChats({
        offsetOrder: '9223372036854775807',
        offsetChatId: 0,
        limit: 500
    })).chatIds;
    for (let i = 0; i < chatList.length; i++) {
        await resolveChatIDToOID(chatList[i]);
    }
}


/**
 * Converts nested JSON Data to something useful
 * @param {Object} content 
 */
function convertContent(content) {
    //console.log(require('util').inspect(content))
    switch (content._) {
        /** * Voice Note */
        case 'voiceNote':
            return convertContent(content.voice)
        /** Video */
        case 'video':
            return convertContent(content.video)
        /** * Photo */
        case 'photo':
            return [
                convertContent(content.sizes[ 0 ]),
                convertContent(content.sizes[ content.sizes.length - 1 ]),
            ]
        case 'photoSize':
            return convertContent(content.photo)
        /** * Sticker */
        case 'sticker':
            return convertContent(content.sticker)
        /** * Document */
        case 'document':
            return convertContent(content.document)
        /** * Animation */
        case 'animation':
            return [
                convertContent(content.thumbnail),
                convertContent(content.animation)
            ]
        /** * files */
        case 'remoteFile':
        case 'file':
            return content


        case 'messageDocument':
            return [convertContent(content.document)]
        case 'messageVoiceNote':
            return [convertContent(content.voiceNote)]
        case 'messageAnimation':
            return convertContent(content.animation)
        case 'messageSticker':
            return [convertContent(content.sticker)]
        case 'messagePhoto':
            return convertContent(content.photo)
        case 'messageVideo':
            return [convertContent(content.video)]
        default:
            // console.log('no files for ', content._)
            return []
    }
}
airgram.on('updateFile', async ({ update }) => {
    console.log('updateFile', update)
    if (update.file.local.isDownloadingCompleted === true) {
        let mediaFile = await Models.File.findOne({ remoteId: update.file.remote.id, })
        if (!!mediaFile) {
            let uploadedFile = await GridFS.uploadFile(update.file.local.path, path.basename(update.file.local.path), path.extname(update.file.local.path).substr(1))
            mediaFile.gridfs = uploadedFile._id
            mediaFile.earlyStage = false
            await mediaFile.save()
        }
        try {
            fs.unlinkSync(update.file.local.path)
        } catch (e) { }
    }
})
async function insertMessage(message) {
    if (await Models.Message.count({ id: message.id, }) > 0) return; // ! Ignorieren wenn schon vorhanden
    // * if (await Models.IgnoreRule.count({ chatId: update.message.chatId }) > 0) return; // ! Ignorieren
    //let chat = await airgram.api.getChat({ chatId: update.message.chatId })
    let info = {
        id: message.id,
        content: message.content,
        isOutgoing: message.isOutgoing,
        mediaAlbumId: message.mediaAlbumId,
        createdAt: new Date(message.date * 1000),
        authorSignature: message.authorSignature,
        views: message.views,
    }
    if (!!message.chatId) {
        info.peer = await resolveChatIDToOID(message.chatId)
    }
    let storageLevel = 3
    if (!!message.senderUserId) {
        info.from = await resolveChatIDToOID(message.senderUserId)
        if (!!info.from) {
            info.fromType = 'Chat'
        } else {
            info.from = await resolveUserIDToOID(message.senderUserId)
            if (!!info.from) {
                info.fromType = 'User'
            }
        }
    }
    
    if (await Models.Chat.count({ id: message.chatId, isChannel: true }) > 0) return; // ! Ignorieren
    const chatEntry = await Models.Chat.findOne({ id: message.chatId })

   //console.log('290', message, info)
    if (!!message.forwardInfo) {
        const forwardInfo = message.forwardInfo
        info.forwardedDate = new Date(forwardInfo.date * 1000)
        info.forwardedType = forwardInfo.origin._
        switch (info.forwardedType) {
            case 'messageForwardOriginUser':
                try {
                    await refreshChatInfo(forwardInfo.origin.senderUserId)
                } catch(e) {}
                info.forwardedFrom = await resolveUserIDToOID(forwardInfo.origin.senderUserId)
                break;
            case 'messageForwardOriginHiddenUser':
                info.forwardedName = forwardInfo.origin.senderName
                break;
            case 'messageForwardOriginChannel':
                info.forwardedName = forwardInfo.origin.authorSignature
                try {
                    await refreshChatInfo(forwardInfo.origin.chatId)
                } catch(e) {}
                info.forwardedFrom = await resolveChatIDToOID(forwardInfo.origin.chatId)
                break;
        }
    }
    const files = convertContent(info.content)
    if (files.length > 0) {
        info.contentFiles = []
        for (let file of files) {
            try {
                //console.log(file)
                let remote = file.remote
                let mediaFile = await Models.File.findOne({ remoteId: remote.id, })
                if(!mediaFile) {
                    mediaFile = await Models.File.create({
                        remoteId: remote.id,
                        size: remote.uploadedSize,
                        storageLevel: storageLevel,
                        type: info.content._
                    })
                    if (remote.uploadedSize <= 16 * 1024 * 1024) {
                        await airgram.api.downloadFile({
                            fileId: file.id,
                            priority: 32,
                            synchronous: false
                        })
                    }
                }
                info.contentFiles.push(mediaFile._id)
            } catch (e) { console.error(e) }
        }
    }
    if (!!info.content) {
        switch (info.content._) {
            case 'messageSticker': {
                delete info.content.sticker.thumbnail
                delete info.content.sticker.sticker.local
                info.content.sticker.sticker = info.content.sticker.sticker.remote
            } break;
        }
    }
    // * saving
    await Models.Message.create(info)
}
async function updateMessage(chatId, messageId, newContent) {
    if (await Models.Chat.count({ id: chatId, }) !== 1) return; // ! Ignorieren wenn nicht vorhanden
    if (await Models.Message.count({ id: messageId, }) !== 1) return; // ! Ignorieren wenn nicht vorhanden
    console.log(newContent)
    await Models.Message.findOneAndUpdate(
        { id: messageId, },
        { $addToSet: { 
            edits: {
                newContent,
                date: new Date()
            }
        }
    })
}
async function importChat(chatId, offset) {
    let history = await airgram.api.getChatHistory({
        chatId: chatId,
        limit: !!offset ? 100 : 1,
        fromMessageId: offset || 0
    })
    let messages = history.response.messages
    let lastMessageID
    for (let message of messages) {
        await insertMessage(message)
        lastMessageID = message.id
    }
    if (!!lastMessageID) {
        setTimeout(importChat, 500, chatId, lastMessageID)
    }
}

airgram.on('updateNewMessage', async ({ update }) => insertMessage(update.message))
airgram.on('updateMessageContent', async ({ update }) => updateMessage(update.chatId, update.messageId, update.newContent))
airgram.on('updateChatReadOutbox', async ({ update }) => { console.log(update) })
//syncWTG()
microService
    /** 
     * Creating a Session
     */
    .get('/status', async (req, res) => {
        let authState = await airgram.api.getAuthorizationState()
        return res.json(authState.response)
    })
    /**
     * First step
     * body = {
     *   phoneNumber: '+49123',
     * }
     */
    .post('/setup/phonenumber', async (req, res) => {
        let authState = await airgram.api.getAuthorizationState()
        if (authState.response._ === 'authorizationStateWaitPhoneNumber' || (authState.response._ === 'authorizationStateWaitCode' && !!req.body.changeNumber)) {
            let $res = await airgram.api.setAuthenticationPhoneNumber({
                phoneNumber: req.body.phoneNumber,
            })
            if ($res._ === 'ok') {
                let authState = await airgram.api.getAuthorizationState()
                return res.json(authState.response)
            }
            return res.status(403).json($res.response)
        }
        return res.status(403).json(authState.response._)
    })
    .post('/setup/code', async (req, res) => {
        let authState = await airgram.api.getAuthorizationState()
        if (authState.response._ === 'authorizationStateWaitCode') {
            let $res = await airgram.api.checkAuthenticationCode({
                code: req.body.code,
            })
            if ($res._ === 'ok') {
                let authState = await airgram.api.getAuthorizationState()
                
                if (authState.response._ === 'authorizationStateReady') {
                    // tgsync.syncWTG()
                }
                if (authState.response._ === 'authorizationStateWaitPassword') {
                    return res.json(authState.response)
                }
                return res.json(authState._)
            }
            return res.status(403).json($res.response)
        }
        return res.status(403).json(authState.response._)
    })
    .post('/setup/password', async (req, res) => {
        let authState = await airgram.api.getAuthorizationState()
        if (authState.response._ === 'authorizationStateWaitPassword') {
            let $res = await airgram.api.checkAuthenticationPassword({
                password: req.body.password,
            })
            console.log($res)
            if ($res._ === 'ok') {
                let authState = await airgram.api.getAuthorizationState()
                if (authState.response._ == 'authorizationStateReady') {
                    // tgsync.syncWTG()
                }
                console.log(authState)
                return res.json(authState.response)
            }
            return res.status(403).json($res.response)
        }
        return res.status(403).json(authState.response._)
    })
    /** Chat Import */
    .post('/import/chat/:chat', async (req, res) => {
        let chatEntry = await Models.Chat.findOne({ _id: req.params.chat })
        if (!chatEntry) return res.status(404).json('Chat not existing in DB')
        let chatData = await airgram.api.getChat({ chatId: chatEntry.id })

        importChat(chatEntry.id)
        res.json(true)

    })
microService.listen(config.telegramInput.port, config.telegramInput.host)