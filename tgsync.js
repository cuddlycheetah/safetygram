const airgram = require('./airgram')

async function syncChat(id) {
    await airgram.api.getChat({ chatId: id })
    //let chatInfo = await airgram.api.getChat({ chatId: id });
    //console.log(chatInfo);
}
async function syncWTG() {
    const me = await airgram.api.getMe()
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
}