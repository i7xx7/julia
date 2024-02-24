const db =  require('mongoose')

let userSchema = new db.Schema({
    _id: { type: Number, require: true },
    serverId: { type: Number, require: true },
    coins: { type: Number, default: 0 }
})

module.exports = db.model("Users", userSchema)