const { Airgram, Auth, prompt } = require('airgram')
const { UPDATE } = require('@airgram/api')

const Settings = require('./Settings')
// const http = require('http')
const express = require('express')
const app = express()

const every = require('every')
const API = require('./api')

const { sequelize,
    Chat, ChatNameset,
    User, UserInfo, UserNameset,
    Message, MessageEdit } =  require('./database')

const fs = require('fs')
const request = require('request')
const md5 = require('siwi-md5')
const airgram = require('./airgram')
const tgsync = require('./tgsync')

app.use(require('body-parser').json())
app.use(require('morgan')('dev'))

app.use(express.static('app_html'))

API.setup(app)
app.get('*', (req, res) => res.redirect('/'))


async function main() {
    if (fs.existsSync('/etc/safetygram/cache/') == false) fs.mkdirSync('/etc/safetygram/cache/')
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

        .then(Chat.sync())
        .then(ChatNameset.sync())

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

/*
updateBasicGroup
updateNewChat
updateChatReadInbox
updateChatLastMessage
updateChatNotificationSettings
updateBasicGroupFullInfo
updateUserStatus
*/

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




/**
 * Converts nested JSON Data to something useful to store in the DB
 * @param {Object} content 
 */
function convertContent(content) {
    console.log(require('util').inspect(content))
    switch (content._) {
        case 'formattedText':
            return content.text
        /** * Voice Note */
        case 'voiceNote':
            return [
                content.mimeType,
                content.duration,
                convertContent(content.file)
            ]
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
        case 'messageVoiceNote':
            return convertContent(content.voiceNote)
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
    console.log(update)
    let chat = await airgram.api.getChat({ chatId: update.message.chatId });
    tgsync.handleChatStats(chat)
    if (chat._ == 'chat' && chat.type._ == 'chatTypePrivate') {
        let messageEntry = await Message.findByPk(update.message.id)
        if (!messageEntry) {
            let contentData = convertContent(update.message.content)
            console.log(update.message)
            console.log(JSON.stringify(contentData, null, '\n'))
            const date = new Date( update.message.date * 1000 )
            const newMessageData = {
                id: update.message.id,

                chatId: update.message.chatId,
                userId: update.message.userId,
                senderChatId: update.message.senderChatId,

                isOutgoing: update.message.isOutgoing,
                isForwarded: !!update.message.forwardInfo,

                replyToMessageId: update.message.replyToMessageId,
                mediaAlbumId: update.message.mediaAlbumId,

                type: contentData[0],
                content: JSON.stringify(contentData[1]),
                deleted: false,

                createdAt: date,
                updatedAt: date,
            }
            if (newMessageData.isForwarded) {
                switch (update.message.forwardInfo.origin._) {
                    case 'messageForwardOriginUser':
                        newMessageData.forwardedUser = update.message.forwardInfo.origin.senderUserId
                        tgsync.handleChatStats(await airgram.api.getChat({ chatId: newMessageData.forwardedUser }))
                        break;
                    case 'messageForwardOriginHiddenUser':
                        newMessageData.fordwardName = update.message.forwardInfo.origin.senderName
                        break;
                    case 'messageForwardOriginChannel':
                        newMessageData.fordwardName = update.message.forwardInfo.origin.authorSignature
                        newMessageData.forwardedChat = update.message.forwardInfo.origin.chatId
                        tgsync.handleChatStats(await airgram.api.getChat({ chatId: newMessageData.forwardedChat }))
                        break;
                }
            }
            const newMessageEntry = new Message(newMessageData)
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

/*airgram.updates.on(UPDATE.updateSecretChat, async ({ update }) => {
    console.log('updateSecretChat', update)
    if (update.secretChat.state._ === 'secretChatStatePending') {
        await airgram.api.setOption('online', { _: 'optionValueBoolean', value: true, });
    }
    if (update.secretChat.state._ === 'secretChatStateReady') {
        console.log('created secret chat')
        // const createdSecretChat = await airgram.api.createSecretChat(update.secretChat.id);

        const chat = await airgram.api.createSecretChat(update.secretChat.id);
        console.log(chat);
        await airgram.api.sendMessage({
            chatId: chat.id,
            inputMessageContent: {
                '_': 'inputMessageText',
                'text': 'Automatische Antwort Test',
            }
        })

    }
})*/
airgram.updates.on(UPDATE.updateSupergroup, async ({ update }) => {
    // console.log(update)
})
/*airgram.updates.on(UPDATE.updateUserStatus, async ({ update }) => { // * On/Offline Events
    console.log(update)
})*/
airgram.updates.on(UPDATE.updateChatPhoto, async ({ update }) => {
    await tgsync.syncChat(update.chatId)
})
airgram.updates.on(UPDATE.updateChatLastMessage, async ({ update }) => {
    // ! { _: 'updateChatLastMessage', chatId: 841718866, order: '0' }
    // * When the lastMessage Update has no message property, the Chat has been DELETED by the other Partner. In this case we want to alarm the Account Owner
    if (!update.lastMessage) {
        // deletionCount
        let chatEntry = await Chat.findByPk(update.chatId)
        if (!!chatEntry) {
            let lastOrNoEntry = chatEntry.type === 'chatTypePrivate'
                ? (await UserNameset.findAll({
                    limit: 1,
                    where: {
                        userId: chatEntry.id
                    },
                    order: [ [ 'createdAt', 'DESC' ]]
                }))
                : (await ChatNameset.findAll({
                    limit: 1,
                    where: {
                        chatId: chatEntry.id
                    },
                    order: [ [ 'createdAt', 'DESC' ]]
                }))
            // 
            chatEntry.deletionCount = chatEntry.deletionCount + 1
            await chatEntry.save()

            const chatName = lastOrNoEntry.length == 0
                ? 'No Chat Name'
                : (
                    chatEntry.type === 'chatTypePrivate'
                        ? `${ lastOrNoEntry[0].firstName } ${ lastOrNoEntry[0].lastName } @${ lastOrNoEntry[0].username }`
                        : `${ lastOrNoEntry[0].name }`
                )
            
            const text = encodeURIComponent(
                `WARNING The Chat for ${ chatName }#${ chatEntry.id } has been Deleted`
            )
            request(`https://api.telegram.org/bot${ Settings.get('botToken', '952461928:AAHMmF2qv5pf_JPSXIALhvs71yGUxbTC8n0') }/sendMessage?chat_id=${ Settings.get('me', { id: 0 }).id }&text=${ text }`)
        }
    }
    // console.log(update)
})
airgram.updates.use(({ update }) => { // ! Debug
    if ( update._ === 'updateUserStatus') return false;
    // console.log( update._ )
})


main();