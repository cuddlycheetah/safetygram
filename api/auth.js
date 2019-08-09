const jwt = require("jwt-simple")
const Settings = require('../Settings')
const UUIDV4 = require('uuid/v4')
const md5 = require('siwi-md5')
const bcrypt = require('bcrypt')

const JWT_SECRET = 'SAFETYGRAM_'// + UUIDV4()
const airgram = require('../airgram')

const tgsync = require('../tgsync')

function expiresIn(numDays) {
    const dateObj = new Date()
    return dateObj.setDate(dateObj.getDate() + numDays)
}

exports.setup = (router) => {
    router.get ('/status', exports.status)
    router.post('/login', exports.token_validate)
    router.get ('/token/check', exports.middleware, exports.token_check)

    router.post('/interface/changepassword', exports.middleware, exports.set_interface_password)

    router.post('/setup/phonenumber', exports.middleware, exports.set_phonenumber)
    router.post('/setup/password', exports.middleware, exports.set_password)
    router.post('/setup/code', exports.middleware, exports.set_code)
}

exports.token_validate = async (req, res) => {
    if (bcrypt.compareSync(req.body.password, Settings.get('password', ''))) {
        exports.token = UUIDV4()
        const expires = expiresIn(1)
        const JWTToken = jwt.encode({
            exp: expires,
            token: exports.token
        }, JWT_SECRET)
        return res.json(JWTToken)
    }
    return res.json(false)
}
exports.token_check = (req, res) => {
    return res.json(true)
}
exports.middleware = function (req, res, next) {
    if (Settings.get('password', '').length == 0) {
        console.log(res.json)
        next();
    } else {
        const token = (req.body && req.body.Authorization) || (req.query && req.query.Authorization) || req.headers['authorization'];
        console.log(token, req.headers)
        if (token) {
            try {
                const decoded = jwt.decode(token, JWT_SECRET)
                console.log(decoded)
                if (decoded.exp <= Date.now()) {
                    return res.status(400).json('Token Expired')
                }
                if (decoded.token == exports.token) {
                    // req.mitarbeiter = $mitarbeiter;
                    res.abort = (reason) => {
                        this.doAbort = true;
                        this.status(500);
                        return this.json(reason);
                    };
                    res.abortIfNotNull = (doAbort, reason) => {
                        if (reason === undefined) {
                            reason = doAbort;
                        }
                        if (doAbort) {
                            this.doAbort = true;
                            this.status(500);
                            return this.json(reason);
                        }
                    }
                    next();
                } else {
                    return res.status(400).json('Token Invalid')
                }
            }
            catch (err) {
                console.error(err)
                return res.status(500).json('Oops something went wrong ' + String(err))
            }
        }
        else {
            return res.status(401).json('Invalid Token or Key')
        }
    }
}

exports.set_password = async (req, res) => {
    let authState = await airgram.api.getAuthorizationState()
    if (authState._ == 'authorizationStateWaitPassword') {
        let $res = await airgram.api.checkAuthenticationPassword({
            password: req.body.password,
        })
        if ($res._ === 'ok') {
            let authState = await airgram.api.getAuthorizationState()
            if (authState._ == 'authorizationStateReady') {
                tgsync.syncWTG()
            }
            return res.json(authState._)
        }
        return res.status(403).json(false)
    }
    return res.status(403).json(false)
}
exports.set_code = async (req, res) => {
    let authState = await airgram.api.getAuthorizationState()
    if (authState._ == 'authorizationStateWaitCode') {
        let $res = await airgram.api.checkAuthenticationCode({
            code: req.body.code,
        })
        if ($res._ === 'ok') {
            let authState = await airgram.api.getAuthorizationState()
            
            if (authState._ == 'authorizationStateReady') {
                tgsync.syncWTG()
            }
            return res.json(authState._)
        }
        return res.status(403).json(false)
    }
    return res.status(403).json(false)
}
exports.set_phonenumber = async (req, res) => {
    let authState = await airgram.api.getAuthorizationState()
    if (authState._ == 'authorizationStateWaitPhoneNumber') {
        let $res = await airgram.api.setAuthenticationPhoneNumber({
            phoneNumber: req.body.phoneNumber,
        })
        if ($res._ === 'ok') {
            let authState = await airgram.api.getAuthorizationState()
            return res.json(authState._)
        }
        return res.status(403).json(false)
    }
    return res.status(403).json(false)
}

exports.set_interface_password = async (req, res) => {
    let hash = bcrypt.hashSync(req.body.password, 16)
    Settings.set('password', hash)
    return res.json(true)
}
exports.status = async (req, res) => {
    let authState = await airgram.api.getAuthorizationState()
    return res.json({
        tgAuth: authState._,
        setup: Settings.get('password', '').length == 0,
        auth: Settings.get('auth', false),
    })
}