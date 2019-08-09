const { Sequelize, Model } = require('sequelize')

class User extends Model {}
class UserInfo extends Model {}
class UserNameset extends Model {}
class Message extends Model {}
class MessageEdit extends Model {}

const sequelize = new Sequelize({
    database: 'safetygram',
    dialect: 'mysql',
    username: 'safetygram',
    password: 'niggers',
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        timestamps: true
    },
    host: '127.0.0.1',
    //storage: './safetygram.db',
    models: [
        User,
        UserInfo,
        UserNameset,
        Message,
        MessageEdit,
    ],
});

User.init({
    id: { type: Sequelize.INTEGER, unique: true, autoIncrement: false, primaryKey: true },
/*
    f0irstName: Sequelize.TEXT,
    lastName: Sequelize.TEXT,
    username: Sequelize.TEXT,
*/
    phoneNumber: Sequelize.STRING,

    isContact: { type: Sequelize.BOOLEAN, defaultValue: false },
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
Message.belongsTo(User, { foreignKey: 'userId' });
Message.belongsTo(User, { foreignKey: 'senderChatId' }); // userId property
User.hasMany(Message); // userId property

MessageEdit.init({
    id: { type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true },
    userId: { type: Sequelize.INTEGER },
    messageId: { type: Sequelize.BIGINT },

    content: Sequelize.STRING(2048),
}, {
    timestamps: true,
    sequelize,
    modelName: 'messageedit'
})
Message.hasMany(MessageEdit); // messageId property
User.hasMany(MessageEdit); // userId property

exports.User = User
exports.UserInfo = UserInfo
exports.UserNameset = UserNameset

exports.Message = Message
exports.MessageEdit = MessageEdit

exports.sequelize = sequelize