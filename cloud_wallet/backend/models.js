const mongoose = require('mongoose')

mongoose.createConnection()

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    publickKey: String,
    privateKey: String,
})

const userModel = mongoose.model("users", userSchema)

module.exports = {
    userModel
}