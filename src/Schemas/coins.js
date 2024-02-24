const db =  require('mongoose')

const schema = new db.Schema({
    _id: { type: Number },
    iduser: { type: Number, required: true },
    coins: { type: Number },
    status: { type: Boolean, default: true }
});

module.exports = db.model('CoinsUser', schema)