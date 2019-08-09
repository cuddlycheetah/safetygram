const fs = require('fs')
class Settings {
    constructor (fileName) {
        this.fileName = fileName
        this.settings = {}
        this.load()
    }

    load () {
        if (fs.existsSync(this.fileName))
            this.settings = JSON.parse(fs.readFileSync(this.fileName))
        else
            this.save()
    }
    save () {
        fs.writeFileSync(this.fileName, JSON.stringify(this.settings, null, '\n'))
    }

    set (key, value) {
        this.settings[key] = value
        this.save()
    }
    get (key, def) {
        if (!this.settings[key]) {
            this.settings[key] = def
            this.save()
        }
        return this.settings[key]
    }
}
module.exports = new Settings('/etc/safetygram/settings.json')
