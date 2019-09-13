const Settings = require('../Settings')
const UUIDV4 = require('uuid/v4')
const fs = require('fs')

exports.setup = (router) => {
    router.get ('/stats/db', exports.get_db_stats)
}

exports.get_db_stats = async (req, res) => {
    const dbArgs = Settings.get('dbSettings', {
        dialect: 'sqlite',
        storage: '/etc/safetygram/safetygram.db',
    })
    const result = {
        fsSize: dbArgs.dialect === 'sqlite' 
            ? parseFloat((fs.statSync(dbArgs.storage).size / 1024 / 1024).toFixed(2)) // SQLIte3 DB-Size in Megabyte
            : -1,
    }
    console.log(result)
    return res.json(result)
}
