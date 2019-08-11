const { Sequelize, Model } = require('sequelize')
const Settings = require('./Settings')
class Chat extends Model {}
class ChatNameset extends Model {}

class User extends Model {}
class UserInfo extends Model {}
class UserNameset extends Model {}
class Message extends Model {}
class MessageEdit extends Model {}

const sequelize = new Sequelize({
    database: 'safetygram',
    ...Settings.get('dbSettings', {
        dialect: 'sqlite',
        storage: '/etc/safetygram/safetygram.db',
    }),
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        timestamps: true
    },
    models: [
        Chat,
        ChatNameset,

        User,
        UserInfo,
        UserNameset,

        Message,
        MessageEdit,
    ],
});

Chat.init({
    id: { type: Sequelize.INTEGER, unique: true, autoIncrement: false, primaryKey: true },
    type: Sequelize.ENUM(
        'chatTypePrivate',
        'chatTypeBasicGroup',
        'chatTypeSupergroup',
    ),
    deletionCount: { type: Sequelize.INTEGER, defaultValue: 0 },
    userId: { type: Sequelize.INTEGER },
    basicGroupId: { type: Sequelize.INTEGER },
    supergroupId: { type: Sequelize.INTEGER },
    isChannel: { type: Sequelize.BOOLEAN, defaultValue: false },
}, {
    timestamps: true,
    sequelize,
    modelName: 'chat'
})
ChatNameset.init({
    id: { type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true },
    chatId: { type: Sequelize.INTEGER },

    hash: Sequelize.STRING,
    name: Sequelize.TEXT,
    photo: Sequelize.STRING,
}, {
    timestamps: true,
    sequelize,
    modelName: 'chatnameset'
})
Chat.hasMany(ChatNameset); // userId property
ChatNameset.belongsTo(Chat, { foreignKey: 'chatId' })


User.init({
    id: { type: Sequelize.INTEGER, unique: true, autoIncrement: false, primaryKey: true },

    phoneNumber: Sequelize.STRING,

    isContact: { type: Sequelize.BOOLEAN, defaultValue: false },
    ignore: { type: Sequelize.BOOLEAN, defaultValue: false },
}, {
    timestamps: true,
    sequelize,
    modelName: 'user'
})

UserNameset.init({
    id: { type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true },
    userId: { type: Sequelize.INTEGER },

    hash: Sequelize.STRING,
    firstName: Sequelize.TEXT,
    lastName: Sequelize.TEXT,
    username: Sequelize.TEXT,
}, {
    timestamps: true,
    sequelize,
    modelName: 'usernameset'
})
User.hasMany(UserNameset); // userId property
User.hasMany(ChatNameset, { foreignKey: 'chatId' });
UserNameset.belongsTo(User, { foreignKey: 'userId' })

UserInfo.init({
    id: { type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true },
    userId: { type: Sequelize.INTEGER },

    hash: Sequelize.STRING,
    bio: Sequelize.TEXT,
}, {
    timestamps: true,
    sequelize,
    modelName: 'userinfo'
})
User.hasMany(UserInfo); // userId property
UserInfo.belongsTo(User, { foreignKey: 'userId' })


Message.init({
    id: { type: Sequelize.BIGINT, unique: true, autoIncrement: false, primaryKey: true },
    chatId: { type: Sequelize.INTEGER },
    userId: { type: Sequelize.INTEGER },
    senderChatId: { type: Sequelize.INTEGER },

    isOutgoing: Sequelize.BOOLEAN,

    replyToMessageId: { type: Sequelize.BIGINT },
    mediaAlbumId: Sequelize.STRING,

    isForwarded: { type: Sequelize.BOOLEAN, defaultValue: false, },
    forwardType: Sequelize.ENUM(
        'messageForwardOriginUser',
        'messageForwardOriginHiddenUser',
        'messageForwardOriginChannel',
    ),
    fordwardName: { type: Sequelize.STRING },
    forwardedUser: { type: Sequelize.INTEGER },
    forwardedChat: { type: Sequelize.INTEGER },

    forwardInfo: Sequelize.STRING(256),

    type: Sequelize.ENUM(
        'ukn',

        'txt',

        'stk',
        'pic',

        'vid',
        'gif',

        'vce',
        'aud',
    ),
    content: Sequelize.STRING(2048),

    deleted: { type: Sequelize.BOOLEAN, defaultValue: false, },
    deletedAt: { type: Sequelize.DATE },

    hasEdits: { type: Sequelize.BOOLEAN, defaultValue: false, },
}, {
    timestamps: true,
    sequelize,
    modelName: 'message'
})
Message.belongsTo(Chat, { foreignKey: 'chatId' });
Message.belongsTo(Chat, { foreignKey: 'senderChatId' }); // userId property
//Message.belongsTo(Chat, { foreignKey: 'forwardedChat' });
Message.belongsTo(User, { foreignKey: 'userId' });
// Message.belongsTo(User, { foreignKey: 'forwardedUser' });
Chat.hasMany(Message);
User.hasMany(Message); // userId property

MessageEdit.init({
    id: { type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true },
    messageId: { type: Sequelize.BIGINT },

    content: Sequelize.STRING(2048),
}, {
    timestamps: true,
    sequelize,
    modelName: 'messageedit'
})
MessageEdit.belongsTo(Message, { foreignKey: 'messageId' });
Message.hasMany(MessageEdit); // messageId property

exports.Chat = Chat
exports.ChatNameset = ChatNameset

exports.User = User
exports.UserInfo = UserInfo
exports.UserNameset = UserNameset

exports.Message = Message
exports.MessageEdit = MessageEdit

exports.sequelize = sequelize
