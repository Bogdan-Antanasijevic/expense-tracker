const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username : {type: String, requried: Boolean, unique: true},
    password : {type: String, requried: Boolean},
    email : {type: String, requried: Boolean, unique: true},
    transactions : {type: Array},

},
{
    timestamps: true
})

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;