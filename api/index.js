const express = require('express')
const { sequelize,
  Chat, ChatNameset,
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
  // Accellerate Cache
  return new Promise((resolve, reject) => {
    try {
      if (fs.existsSync(filePath)) return resolve(filePath);
      const fileStream = bot.getFileStream(fileId)
      fileStream.on('info', (info) => {
        pump(fileStream, fs.createWriteStream(filePath), (error) => {
          if (error) { return reject(error) }
          return resolve(filePath)
        })
      })
    } catch (e) {
      return reject(e);
    }
  });
}

module.exports = exports = {
    router: null,
    setup (app) {
        this.router = express.Router()
        this.routerProtected = express.Router()
        this.routerProtectedCustom = express.Router()
        this.routerProtectedCustom2 = express.Router()
        
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

        rest(this.routerProtected, '/chat', Chat)
        rest(this.routerProtected, '/chatnameset', ChatNameset)

        rest(this.routerProtected, '/user', User)
        rest(this.routerProtected, '/usernameset', UserNameset)
        rest(this.routerProtected, '/userinfo', UserInfo)

        rest(this.routerProtected, '/message', Message)
        rest(this.routerProtected, '/messageedit', MessageEdit)

        require('./stats').setup(this.routerProtectedCustom2)

        const fetchFile = async (req, res) => {
          const fileId = req.params.fileId
          try {
            let $file = '/etc/safetygram/cache/' + fileId
            const fileInfo = await bot.getFile(fileId)
            if (!!fileInfo.Error) return res.abort(fileInfo.Error);
            console.log(fileInfo)

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
        }
        const fetchFileClient = async (req, res) => {
          const fileInfo = await airgram.api.downloadFile({
              fileId: req.params.fileId,
              synchronous: false,
              priority: 3,
          })
          console.log(fileInfo)
          let localFile = fileInfo.local
          if (!fileInfo.local) return res.status(404).send(null)
          return res.sendFile(localFile.path)
        }

        this.router.get('/file/fetch/:fileId', fetchFile)
        this.router.get('/file/fetch/:fileId/*', fetchFile)
        this.router.get('/file/clientfetch/:fileId', fetchFileClient)
        this.router.get('/file/clientfetch/:fileId/*', fetchFileClient)

        this.router.use('/rest', require('./auth').middleware, this.routerProtected)
        this.router.use('/crest', require('./auth').middleware, this.routerProtectedCustom)
        this.router.use('/v2', require('./auth').middleware, this.routerProtectedCustom2)
        // console.log(this.router.stack)
    }
}