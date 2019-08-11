const airgram = require('./airgram')
const { sequelize,
    Chat, ChatNameset,
    User, UserInfo, UserNameset,
    Message, MessageEdit } =  require('./database')
const md5 = require('siwi-md5')
const Settings = require('./Settings')

async function handleChatStats(chatData) {
    let chatEntry = await Chat.findByPk(chatData.id)
    if (!chatEntry) {
        const newChatData = {
            id: chatData.id,
            type: chatData.type._,
        }
        switch (chatData.type._) {
            case 'chatTypePrivate':
                newChatData.userId = chatData.type.userId
                break;
            case 'chatTypeBasicGroup':
                newChatData.basicGroupId = chatData.type.basicGroupId
                break;
            case 'chatTypeSupergroup':
                newChatData.supergroupId = chatData.type.supergroupId
                break;
        }
        const newChatEntry = new Chat(newChatData)
        await newChatEntry.save()
    }
    let chatPhoto = !!chatData.photo
        ? chatData.photo.big.remote.id
        : ''
    let uniqueName = `${chatData.title}${chatPhoto}`
    let hash = await md5.sign(uniqueName)
    let lastOrNoEntry = await ChatNameset.findAll({
        limit: 1,
        where: {
            chatId: chatData.id
        },
        order: [ [ 'createdAt', 'DESC' ]]
    })
    if (lastOrNoEntry.length == 1 && lastOrNoEntry[0].hash !== hash) {
        lastOrNoEntry = []
    }
    if (lastOrNoEntry.length == 0) {
        let newChatNameset = new ChatNameset({
            chatId: chatData.id,
            name: chatData.title,
            photo: chatPhoto,
            hash: hash
        })
        await newChatNameset.save();
    }
}
async function syncChat(id) {
    let chatInfo = await airgram.api.getChat({ chatId: id })
    handleChatStats(chatInfo)
    //let chatInfo = await airgram.api.getChat({ chatId: id });
    //console.log(chatInfo);
}
async function syncWTG() {
    const me = await airgram.api.getMe()
    console.log(me)
    Settings.set('me', me)

    const contacts = await airgram.api.getContacts()
    let chatList = (await airgram.api.getChats({
        offsetOrder: '9223372036854775807',
        offsetChatId: 0,
        limit: 100
    })).chatIds;
    for (let i=0; i < chatList.length; i++) {
        await syncChat(chatList[i]);
    }
}
module.exports = {
    syncWTG,
    syncChat,
    handleChatStats,
}