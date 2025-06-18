const UserModel = require("../models/UserModel");
const { authorization, commonError } = require("../helpers/CommonMessage");
const { tokens } = require("../helpers/Helpers");
const TokenModel = require("../models/TokenModel");

// This controller is responsible for cerate a new user account
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        
        // Create a new user with required details
        UserModel.create({ firstName, lastName,email, password }).then(() => {
            res.status(200).json({ message: authorization.register.success, success: true })
        }).catch((error) => {
            res.status(200).json({ message: authorization.register.failed, success: false, error: error.stack })
        })
    } catch (error) {
        res.status(500).json(commonError(error))
    }
}

// This controller is responsible for user login and return jwt token
exports.login = (req, res) => {
    try {
        const { userName, password } = req.body

        UserModel.findOne({ $or: [{ email: { $regex: userName, $options: "si" } }] }).then(async (result) => {
            if (!result) {
                return res.status(200).json({ message: authorization.login.noUser, success: false })
            }
            if (!await result.comparePassword(password)) {
                return res.status(200).json({ message: authorization.login.wrong, success: false })
            }
            res.status(200).json({ message: authorization.login.success, success: true, token: await tokens(result._id) })
        }).catch((error) => {
            res.status(400).json({ message: authorization.login.failed, success: false, error: error.stack })
        })
    } catch (error) {
        res.status(500).json(commonError(error))
    }
}

// This controller is responsible for user's details fetching information
exports.userDetails = (req, res) => {
    try {
        const { userDetails } = req

        UserModel.findOne({ _id: userDetails._id }, { password: 0, activation: 0, resetPassword: 0, isActive: 0 }).then((result) => {
            if (!result) {
                return res.status(200).json({ message: authorization.details.notFound, success: false })
            }
            res.status(200).json({ message: authorization.details.success, success: true, data: result })
        }).catch((error) => {
            res.status(400).json({ message: authorization.details.failed, success: false, error: error.stack })
        })

    } catch (error) {
        res.status(500).json(commonError(error))
    }
}

// This controller is responsible for user logout and remove jwt token
exports.logout = (req, res) => {
    try {
        const { tokenDetails } = req

        TokenModel.findOneAndDelete({ _id: tokenDetails._id }).then((result) => {
            res.status(200).json({ message: authorization.logout.success, success: true, data: result })
        }).catch((error) => {
            res.status(400).json({ message: authorization.logout.failed, success: false, error: error.stack })
        })
    } catch (error) {
        res.status(500).json(commonError(error))
    }
}
