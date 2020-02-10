const config = require('../../config')
const axios = require('axios')

const { schemaComposer } = require('../../node_modules/graphql-compose')
const graphql = require ('graphql');  

require('./$Chat')
require('./$ChatNameset')

require('./$User')
require('./$UserInfo')
require('./$UserNameset')

const $Message = require('./$Message')
require('./$File')

require('./$Option')

require('./$OperationStatus')

const mongoose = require('mongoose')
const Models = require('../index')
const ChatOverviewType = new graphql.GraphQLObjectType({  
    name: 'chatOverview',
    fields: function () {
      return {
        _id: {
            type: 'MongoID!'
        },
        type: {
            type: graphql.GraphQLString
        },
        name: {
            type: graphql.GraphQLString
        },
        user: {
            type: 'MongoID',
        },
        photo: {
            type: 'MongoID',
        },
      }
    }
});
const DashboardStatsType = new graphql.GraphQLObjectType({
    name: 'dashboardStats',
    fields: function () {
      return {
        chats: {
            type: graphql.GraphQLInt
        },
        users: {
            type: graphql.GraphQLInt
        },
        messages: {
            type: graphql.GraphQLInt
        },
        messagesDeleted: {
            type: graphql.GraphQLInt
        },
        files: {
            type: graphql.GraphQLInt
        },
        totalDBSize: {
            type: graphql.GraphQLFloat
        },
        totalArchiveSize: {
            type: graphql.GraphQLInt
        },
        telegramStatus: {
            type: graphql.GraphQLString
        }
      }
    }
});

const DBStats = () => {
    return new Promise(async (res, rej) => {
        try {
            mongoose.connection.db.stats((err, data) => {
                res(data)
            })
        } catch (e) {
            console.error(e)
            rej(e)
        }
    })
}
const fetchTelegramStatus = async () => {
    let res = await axios.get(`http://${ config.telegramInput.host }:${ config.telegramInput.port }/status`)
    return res.data._
}

const setupResult = new graphql.GraphQLObjectType({
    name: 'setupResult',
    fields: function () {
      return {
        telegramStatus: {
            type: graphql.GraphQLString
        }
      }
    }
})
schemaComposer.Mutation.addFields({
    setupPhoneNumber: {
        args: { phoneNumber: 'String' },
        type: setupResult,
        resolve: async (context, args) => {
            let res = await axios.post(`http://${ config.telegramInput.host }:${ config.telegramInput.port }/setup/phonenumber`, args)
            return {
                telegramStatus: await fetchTelegramStatus(),
            }
        }
    },
    setupCode: {
        args: { code: 'String' },
        type: setupResult,
        resolve: async (context, args) => {
            let res = await axios.post(`http://${ config.telegramInput.host }:${ config.telegramInput.port }/setup/code`, args)
            return {
                telegramStatus: await fetchTelegramStatus(),
            }
        }
    },
    setupPassword: {
        args: { password: 'String' },
        type: setupResult,
        resolve: async (context, args) => {
            let res = await axios.post(`http://${ config.telegramInput.host }:${ config.telegramInput.port }/setup/password`, args)
            return {
                telegramStatus: await fetchTelegramStatus(),
            }
        }
    },
    importChat: {
        args: { chatId: 'MongoID!' },
        type: graphql.GraphQLBoolean,
        resolve: async (context, args) => {
            let res = await axios.post(`http://${ config.telegramInput.host }:${ config.telegramInput.port }/import/chat/${ args.chatId }`)
            return true
        }
    },
})
schemaComposer.Query.addFields({
    stats: {
        type: DashboardStatsType,
        resolve: async ({ source, args, context, info }) => {
            const dbStats = await DBStats()
            return {
                chats: await Models.Chat.count(),
                users: await Models.User.count(),
                messages: await Models.Message.count(),
                messagesDeleted: await Models.Message.count({ deleted: true }),
                files: await Models.File.count(),
                totalDBSize: (dbStats.storageSize / 1024 / 1024).toPrecision(4),
                totalArchiveSize: -1,
                telegramStatus: await fetchTelegramStatus(),
            }
        }
    },
    searchMessages: {
        type: new graphql.GraphQLList($Message.getType()),
        args: { text: 'String!', from: 'MongoID', peer: 'MongoID' },
        resolve: async (context, args) => {
            let f = {}
            if (!!args.peer) f.peer = args.peer
            if (!!args.from) f.peer = args.from
            
            let query = { $text: { $search: args.text }, ...f }
            return Models.Message.find(query)
        },
    },
    chatOverview: {
        type: new graphql.GraphQLList(ChatOverviewType),
        resolve: async (context, args) => {
            let ids = await Models.ChatNameset.find().distinct('chat')
            ids = [...new Set(ids)]
            let res = await Models.ChatNameset.find().sort({ created : 1 }).populate('chat')
            let chatList = {}
            for (let i = 0; i < res.length; i++) {
                const chatNameset = res[i]
                if (!chatList[chatNameset.chat._id] ) {
                    chatList[chatNameset.chat._id] = {
                        _id: chatNameset.chat._id,
                        type: chatNameset.chat.type,
                        name: chatNameset.name,
                        photo: chatNameset.photo,
                        lastMessageDate: !!chatNameset.chat.lastUpdate ? chatNameset.chat.lastUpdate : new Date(0)
                    }
                }
            }
            chatList = Object.values(chatList)
            chatList.sort((a,b) => b.lastMessageDate - a.lastMessageDate)
            return chatList
        }
    }
})
// schemaComposer.add(queryType)
const graphqlSchema = schemaComposer.buildSchema();
module.exports = graphqlSchema