// This file generate user schema for store on database
const { default: mongoose } = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
}, { timestamps: true })

// Before create or update a record update email address to lowercase and check if password is update then encrypt it and then save
userSchema.pre('save', async function (next) {
    const user = this;
    this.email = this.email.toLowerCase()
    if (user.isModified('password')) {
        let salt = bcrypt.genSaltSync(10)
        user.password = bcrypt.hashSync(user.password, salt);
    }
    next();
})

// User method for compare password to check password is matched or not
userSchema.methods.comparePassword = async function (password) {
    if (!this.password) return false;
    return bcrypt.compareSync(password, this.password);
}

// This module is export user schema for use in other files
module.exports = mongoose.model('users', userSchema)