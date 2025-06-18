// This file generate token schema for store on database
const { default: mongoose } = require("mongoose");

const tokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    token: {
        type: String,
        required: true
    },
}, { timestamps: true })

tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1296000 });

// This module is export token schema for use in other files
module.exports = mongoose.model("tokens", tokenSchema)