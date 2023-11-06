import { Schema, model } from "mongoose";


let UserSchema = new Schema({
    firstName: {
        type: String,
        require: true,
    },
    userName: {
        type: String,
        require: true,
        unique : true
    },
    lastName: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean
    },
    password: {
        type: String,
        require: true
    },


})

let User = model('user', UserSchema)

export default User