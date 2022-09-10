const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username : {type: String, requried: Boolean},
    password : {type: String, requried: Boolean},
    email : {type: String, requried: Boolean},

})

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;