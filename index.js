const { Airgram, Auth, prompt } = require('airgram')
const { UPDATE } = require('@airgram/api')

const Settings = require('./Settings')
// const http = require('http')
const express = require('express')
const app = express()

const every = require('every')
const API = require('./api')

const { sequelize, 
    User, UserInfo, UserNameset,
    Message, MessageEdit } =  require('./database.js')

const fs = require('fs')
const md5 = require('siwi-md5')
const airgram = require('./airgram')
const tgsync = require('./tgsync')

app.use(require('body-parser').json())
app.use(require('morgan')('dev'))

app.use(express.static('app_html'))

API.setup(app)
app.get('*', (req, res) => res.redirect('/'))


async function main() {
    if (fs.existsSync('cache') == false) fs.mkdirSync('cache')
    await sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        app.listen(Settings.get('port', 46590))
        console.log('Express server listening')

        return User.sync()
        .then(UserInfo.sync())
        .then(UserNameset.sync())
        .then(Message.sync())
        .then(MessageEdit.sync())
        .then(async () => {
            let authState = await airgram.api.getAuthorizationState()
            console.log(
                'tg authed', authState //authorizationStateWaitPhoneNumber
            )
            if (authState._ == 'authorizationStateReady') {
                every(1000 * 60 * 5).on('data', () => tgsync.syncWTG())
            }
        })
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    });
}



airgram.updates.on(UPDATE.updateUser, async ({ update }) => {
    if (!!update.user && !!update.user.type && update.user.type._ !== 'userTypeRegular') return console.error('User ignored, because not userTypeRegular', update.user.type._)
    let updateEntry = await User.findByPk(update.user.id)
    if (!updateEntry) {
        updateEntry = new User(update.user)
        await updateEntry.save();
    } else {
        updateEntry.phoneNumber = update.user.phoneNumber;
        updateEntry.save();
    }

    let userEntry = updateEntry
    let uniqueName = `${update.user.firstName}${update.user.lastName}${update.user.username}`
    let hash = await md5.sign(uniqueName)
    let lastOrNoEntry = await UserNameset.findAll({
        limit: 1,
        where: {
            userId: userEntry.id
        },
        order: [ [ 'createdAt', 'DESC' ]]
    })
    if (lastOrNoEntry.length == 1 && lastOrNoEntry[0].hash !== hash) {
        lastOrNoEntry = []
    }
    if (lastOrNoEntry.length == 0) {
        let newUserNameset = new UserNameset({
            userId: userEntry.id,
            firstName: update.user.firstName,
            lastName: update.user.lastName,
            username: update.user.username,
            hash: hash
        })
        await newUserNameset.save();
    }
})

airgram.updates.on(UPDATE.updateUserFullInfo, async ({ update }) => {
    //console.log(update)
    let userEntry = await User.findByPk(update.userId)
    if (!!userEntry) {
        let bio = (!!update.userFullInfo && !!update.userFullInfo.bio)
            ? update.userFullInfo.bio
            : '';
        let hash = await md5.sign(bio)
        let lastOrNoEntry = await UserInfo.findAll({
            limit: 1,
            where: {
                userId: userEntry.id
            },
            order: [ [ 'createdAt', 'DESC' ]]
        })
        if (lastOrNoEntry.length == 1 && lastOrNoEntry[0].hash !== hash) {
            lastOrNoEntry = []
        }
        if (lastOrNoEntry.length == 0) {
            let newUserInfo = new UserInfo({
                userId: userEntry.id,
                bio: bio,
                hash: hash
            })
            await newUserInfo.save();
        }
    } else {
        console.error('got fullinfo for user that isnt in db WTF??')
    }
})
function convertContent(content) {
    console.log(require('util').inspect(content))
    switch (content._) {
        case 'formattedText':
            return content.text

        /** * Photo */
        case 'photo':
            return convertContent(content.sizes[ content.sizes.length - 1 ])
            case 'photoSize':
                return convertContent(content.photo.remote)
        /** * Sticker */
        case 'sticker':
            return [
                convertContent(content.sticker),
            ]
        /** * Animation */
        case 'animation':
            return [
                convertContent(content.thumbnail),
                convertContent(content.animation),
                content.fileName,
                content.mimeType
            ]
        /** * files */
        case 'file':
            return convertContent(content.remote)
        case 'remoteFile':
            return content.id

/*
        'ukn',
        
        'txt',
        
        'stk',
        'pic',
        
        'vid',
        'gif',
        
        'vce',
        'aud',
*/
        case 'messageText':
            return [
                'txt',
                convertContent(content.text)
            ]
        case 'messageAnimation':
            return [
                'gif',
                [
                    convertContent(content.caption),
                ].concat(convertContent(content.animation))
            ]
        case 'messageSticker':
            return [
                'stk',
                [].concat(convertContent(content.sticker))
            ]
        case 'messagePhoto':
            return [
                'pic',
                [
                    convertContent(content.caption),
                ].concat(convertContent(content.photo) )
            ]
        default:
            console.log(content)
            return [
                'ukn',
                content._,
            ]
    }
}





/**
 * * Eingehende Nachrichten in der Datenbank erstellen
 */
airgram.updates.on(UPDATE.updateNewMessage, async ({ update }) => {
    let chat = await airgram.api.getChat({ chatId: update.message.chatId });
//    console.log(update)
//    console.log(chat)
/*
forwardInfo:
   { _: 'messageForwardInfo',
     origin:
      { _: 'messageForwardOriginChannel',
        chatId: -1001088649810,
        messageId: 681311207424,
        authorSignature: '' },
     date: 1561721458,
     fromChatId: 0,
     fromMessageId: 0 },
*/
    if (chat._ == 'chat' && chat.type._ == 'chatTypePrivate') {
        let messageEntry = await Message.findByPk(update.message.id)
        if (!messageEntry) {
            let contentData = convertContent(update.message.content)
            console.log(update.message)
            console.log(JSON.stringify(contentData, null, '\n'))
            const date = new Date( update.message.date * 1000 )
            const newMessageEntry = new Message({
                id: update.message.id,

                chatId: update.message.chatId,
                userId: update.message.userId,
                senderChatId: update.message.senderChatId,

                isOutgoing: update.message.isOutgoing,

                isForwarded: !!update.message.forwardInfo,
                // forwardInfo: !!update.message.forwardInfo ? JSON.stringify(update.message.forwardInfo) : '',

                replyToMessageId: update.message.replyToMessageId,
                mediaAlbumId: update.message.mediaAlbumId,

                type: contentData[0],
                content: JSON.stringify(contentData[1]),
                deleted: false,

                createdAt: date,
                updatedAAt: date,
            })
            await newMessageEntry.save()
        }
    }
})
/**
 * * Gelöschte Nachrichten in der Datenbank als deleted markieren
 */
airgram.updates.on(UPDATE.updateDeleteMessages, async ({ update }) => {
    let chatEntry = await User.findByPk(update.chatId)
    if (!!chatEntry) {
        const NOW = new Date()
        for (let i=0;i < update.messageIds.length; i++) {
            let messageEntry = await Message.findByPk(update.messageIds[ i ])
            if (!!messageEntry) {
                messageEntry.deleted = true
                messageEntry.deletedAt = NOW
                await messageEntry.save()
            }
        }
    }
})
/**
 * * Bearbeitete Nachrichten in der Datenbank erstellen
 */
airgram.updates.on(UPDATE.updateMessageContent, async ({ update }) => {
    let chatEntry = await User.findByPk(update.chatId)
    if (!!chatEntry) {
        const NOW = new Date()
        let messageEntry = await Message.findByPk(update.messageId)
        if (!!messageEntry) {
            let contentData = convertContent(update.newContent)
            let newMessageEntry = new MessageEdit({
                userId: chatEntry.id,
                messageId: messageEntry.id,
                content: JSON.stringify(contentData[1]),
            })
            await newMessageEntry.save()
            messageEntry.hasEdits = true
            await messageEntry.save()
        }
    }
})

/*airgram.updates.on('', async ({ update }) => {
    console.log(update)
})*/

airgram.updates.use(({ update }) => {
    console.log( update._ )
})





/*
user:
    { _: 'user',
    id: 777000,
    firstName: 'Telegram',
    lastName: '',
    username: '',
    phoneNumber: '42777',
    status: { _: 'userStatusOffline', wasOnline: 1495493589 },
    profilePhoto:
        { _: 'profilePhoto',
        id: '3337190045231018',
        small: [Object],
        big: [Object] },
    outgoingLink: { _: 'linkStateNone' },
    incomingLink: { _: 'linkStateNone' },
    isVerified: true,
    isSupport: true,
    restrictionReason: '',
    haveAccess: true,
    type: { _: 'userTypeRegular' },
    languageCode: '' } }
updateUserFullInfo { _: 'upda
*/

/*
airgram.updates.on(UPDATE.updateUserFullInfo, ({ update }) => {
    console.log(update)
})


airgram.updates.on(UPDATE.updateMessageEdited, async ({ update }) => {
    if(update) {
    const editedMessage = await airgram.api.getMessage({
        chatId: update.chatId,
        messageId: update.messageId,
    })
    console.log(update, editedMessage)
    }
})
*/
main();