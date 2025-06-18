const TokenModel = require("../models/TokenModel");
const jwt = require("jsonwebtoken");

// Generate JWT token for user and store it or feature use
exports.tokens = async (id) => {
    return new Promise(function (resolve, reject) {
        TokenModel.create({ user: id, token: jwt.sign({ id }, process.env.TOKEN_KEY, { expiresIn: '15d' }) }).then((result) => {
            resolve(result.token)
        }).catch((error) => {
            reject(error)
        })
    })
}

// Verify JWT token and get user details from payload of token
exports.verifyToken = async (token) => {
    return jwt.verify(token, process.env.TOKEN_KEY, { complete: true })
}

// function to add paginate on data
exports.pagination = (limit, page, total) => {
    return { limit: Number(limit), page: Number(page), totalPage: Math.ceil(total / Number(limit)), skip: (Number(page) - 1) * Number(limit), totalDocuments: total }
}