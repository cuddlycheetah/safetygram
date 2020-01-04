const config = require('../config')
const express = require('../node_modules/express')
const bodyParser = require('../node_modules/body-parser')

const jwt = require("jwt-simple")
const UUIDV4 = require('uuid/v4')
const request = require('request')
const bcrypt = require('bcryptjs')
const JWT_SECRET = 'SAFETYGRAM_' + UUIDV4()
var express_graphql = require('../node_modules/express-graphql');

const microService = express()
// MongoDB
const { mongoose, GridFS, Models } = require('../database')
// Root resolver
var root = { message: () => 'Hello World!' }
const main = async () => {
    if ((await Models.Option.count({ key: 'password' })) === 0) {
        Models.Option.create({
            key: 'password',
            type: 'string',
            value: 'admin',
            default: 'admin',
            desc: 'The login password, please change it after installation!'
        })
    }
    if ((await Models.Option.count({ key: 'bot.token' })) === 0) {
        Models.Option.create({
            key: 'bot.token',
            type: 'string',
            value: '956689783:AAEpJZJVihs9bHyTQoLVfrXGixPgjBNxHeU',
            default: '956689783:AAEpJZJVihs9bHyTQoLVfrXGixPgjBNxHeU',
            desc: 'The notification-bot token, please change it after installation!'
        })
    }
    if ((await Models.Option.count({ key: 'self.id' })) === 0) {
        Models.Option.create({
            key: 'self.id',
            type: 'int*',
            value: -1,
            default: -1,
            desc: 'The chatID the bot needs for sending a notification to you (this is set automaticly)!'
        })
    }
}
main()
function expiresIn(numDays) {
    const dateObj = new Date()
    return dateObj.setDate(dateObj.getDate() + numDays)
}
let currentLoginToken = ''
const JWTMiddleware = async (req, res, next) => {
    if ((await Models.Option.count({ key: 'password' })) === 0) {
        next();
    } else {
        let token = (req.body && req.body.Authorization) || (req.query && req.query.Authorization) || req.headers['authorization'];
        if (token) {
            try {
                if (token.indexOf('Bearer') > -1) token = token.substring(7)
                const decoded = jwt.decode(token, JWT_SECRET)
                if (decoded.exp <= Date.now()) return res.status(400).json('Token Expired')
                if (decoded.token === currentLoginToken) next(); else return res.status(400).json('Token Invalid')
            } catch (err) {
                console.error(err)
                return res.status(500).json({ error: 'Oops something went wrong ' + String(err)} )
            }
        }
        else return res.status(401).json({ error: 'Invalid Token or Key'} )
    }
}
async function sendNotification(text) {
    text = encodeURIComponent(text)
    try {
        request(`https://api.telegram.org/bot${ (await Models.Option.findOne({ key: 'bot.token' })).value }/sendMessage?chat_id=${ (await Models.Option.findOne({ key: 'self.id' })).value }&text=${ text }`)
    } catch(e) {
        console.error(e)
    }
}

//microService.use(express.static("public"))
microService.use(bodyParser.json(true))

// Login
microService.post('/api/login', async (req, res) => {
    let hash = bcrypt.hashSync(req.body.password, 8)
    if (!bcrypt.compareSync(req.body.password, (await Models.Option.findOne({ key: 'password' })).value)) {
        await sendNotification(
            `FAILED!!!! Login from ${ req.headers['x-forwarded-for'] || req.connection.remoteAddress }`
        )
        return res.status(401).json(false)
    }
    currentLoginToken = UUIDV4()
    const expires = expiresIn(1)
    const JWTToken = jwt.encode({
        exp: expires,
        token: currentLoginToken
    }, JWT_SECRET)
    await sendNotification(
        `SUCCESSFULL 👌🏻 Login from ${ req.headers['x-forwarded-for'] || req.connection.remoteAddress }`
    )
    return res.json(JWTToken)
})
microService.get('/api/token/check', JWTMiddleware, (req, res) => req.json(true))

microService.use('/api/file/:file', async (req, res) => {
    try {
        const fileInfo = await Models.File.findById(req.params.file)
        if (!fileInfo) return res.status(404).json(false)
        //TODO: wir gehen mal davon aus das wir noch keinen Storage-Manager haben und alles immer vorhanden ist.
       return GridFS.getFileStream(fileInfo.gridfs)
        .then((item) => {
            item
            .once("error", () => res.status(400).end())
            .pipe(res)
        })
        .catch(() => res.status(500))

    } catch (e) {
        return res.sendFile(__dirname + '/emptyImage.jpeg')
    }
})


const schema = require('../models/graphql')


microService.use('/api/graphql', 
    JWTMiddleware,
    express_graphql({
        schema: schema,
        rootValue: root,
        graphiql: false
    })
)
microService.use('/api/interactive', 
    JWTMiddleware,
    express_graphql({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
)

microService.get('/api/status', JWTMiddleware, (req,res) => request(`http://${ config.telegramInput.host }:${ config.telegramInput.port }/status`).pipe(res))
//microService.post('/api/setup/phonenumber', JWTMiddleware, (req,res) => request.post(`http://${ config.telegramInput.host }:${ config.telegramInput.port }/setup/phonenumber`, { json: true, body: req.body }).pipe(res))
//microService.post('/api/setup/code', JWTMiddleware, (req,res) => request.post(`http://${ config.telegramInput.host }:${ config.telegramInput.port }/setup/code`, { json: true, body: req.body }).pipe(res))
//microService.post('/api/setup/password', JWTMiddleware, (req,res) => request.post(`http://${ config.telegramInput.host }:${ config.telegramInput.port }/setup/password`, { json: true, body: req.body }).pipe(res))
//microService.post('/api/import/chat/:chat', JWTMiddleware, (req,res) => request.post(`http://${ config.telegramInput.host }:${ config.telegramInput.port }/chat/import/${ req.params.chat }`).pipe(res))

microService.listen(config.frontendApi.port, config.frontendApi.host, 
    () => console.log(`Express GraphQL Server Now Running On localhost:${ config.frontendApi.port }/graphql`))
;