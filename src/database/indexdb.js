const db =  require('mongoose')
require('dotenv').config()

try {
    db.connect(process.env.URLDB)
    console.log('[DATABASE] Database conectada com sucesso!')
} catch (err){
    console.log(`[DATABASE] Houve um erro ao conectar: ${err}`)
}