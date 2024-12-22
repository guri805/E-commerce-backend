const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    mobile:{
        type:String
    },
    address:{
        type:String
    },
},
{ timestamps: true }
)

const User = mongoose.model('User',UserSchema)
module.exports = User;