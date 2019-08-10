const express = require('express')
const { sequelize, 
    User, UserInfo, UserNameset,
    Message, MessageEdit } =  require('../database')
const airgram = require('../airgram')
const Settings = require('../Settings')


const fs = require('fs')
const pump = require('pump')
const TelegramBot = require('node-telegram-bot-api')
const BOT_TOKEN = Settings.get('botToken', '952461928:AAHMmF2qv5pf_JPSXIALhvs71yGUxbTC8n0') // Public because, i just need it to download files

const bot = new TelegramBot(BOT_TOKEN, {polling: false})

const downloadFile = (fileId, filePath) => {
    let resolve
    let reject
    const promise = new Promise((a, b) => {
      resolve = a
      reject = b
    })
    const fileStream = bot.getFileStream(fileId)
    fileStream.on('info', (info) => {
      pump(fileStream, fs.createWriteStream(filePath), (error) => {
        if (error) { return reject(error) }
        return resolve(filePath)
      })
    })
    return promise
}

module.exports = exports = {
    router: null,
    setup (app) {
        this.router = express.Router()
        this.routerProtected = express.Router()
        this.routerProtectedCustom = express.Router()
        
        app.use(function (req, res, next) {
          res.abort = function (reason) {
            this.doAbort = true
            this.status(500)
            fs.writeFileSync('error' + (new Date().getTime()), reason)
            console.error(reason)
            return this.json(reason)
          }
          res.abortIfNotNull = function (doAbort, reason) {
            if (reason == null) {
              reason = doAbort
            }
            if (doAbort) {
              this.doAbort = true
              this.status(500)
              console.error(reason)
              return this.json(reason)
            }
          }
          next()
        })
        app.use('/api', this.router)
        
        
        require('./auth').setup(this.router)
        const rest = require('./data')

        require('./crest')(this.routerProtectedCustom)

        rest(this.routerProtected, '/user', User)
        rest(this.routerProtected, '/usernameset', UserNameset)
        rest(this.routerProtected, '/userinfo', UserInfo)
        rest(this.routerProtected, '/message', Message)
        rest(this.routerProtected, '/messageedit', MessageEdit)


        this.router.get('/file/fetch/:fileId', async (req, res) => {
            console.log(req.params.fileId)
            const fileId = req.params.fileId
            try {
              let $file = require('path').join(__dirname, '/../cache/' + fileId)
              let $readStream = await downloadFile(fileId, $file)
              return res.sendFile($file)
            } catch (e) {
              return res.abort(e);
            }
            /*airgram.api.downloadFile({
                fileId: req.params.fileId,
                synchronous: true,
                priority: 3,
            })
            .then((fileInfo) => {
                console.log(fileInfo)
                let localFile = fileInfo.local
                if (!fileInfo.local) return res.status(404).send(null)
                return res.sendFile(localFile.path)
            })
            .catch(console.error)*/
        })
        
        this.router.use('/rest', require('./auth').middleware, this.routerProtected)
        this.router.use('/crest', require('./auth').middleware, this.routerProtectedCustom)
        console.log(this.router.stack)
    }
}