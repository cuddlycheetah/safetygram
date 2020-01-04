const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const schema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    type: String,
    default: mongoose.Mixed,
    desc: String,
    value: mongoose.Mixed,
})
schema.pre('save', function(next) {
    var option = this;
    console.log(option)
    if (option.key !== 'password') return next()
    console.log('it is the pw')
    if (!option.isModified('value')) return next()
    if (typeof(option) === 'object' && option._ == 'defaultPassword') {
        option.value = '$2a$08$jQyEIGpm5//CX8Eg.P0I3.S72SVTFfINCeIOUh5Uff/2G8Kg.wLQu'
        return next()
    } 
    console.log('it has changed')

    let hash = bcrypt.hashSync(option.value, 8)
    option.value = hash
    next()
});
module.exports = mongoose.model('Option', schema)