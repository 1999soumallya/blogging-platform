const { verifyToken } = require("../helpers/Helpers")
const CommonMessage = require("../helpers/CommonMessage")
const TokenModel = require("../models/TokenModel")

// This function is help to guard sensitive apis using user authentication
exports.isAuthorized = async (req, res, next) => {
    try {
        // Verify token from header of request
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

            // Remove Bearer from token
            let token = req.headers.authorization.split(" ")[1]

            // Verify token and get user details from payload of token
            await verifyToken(token).then(async (details) => {

                // Check if token is valid and user exists in database
                let tokenDetails = await TokenModel.findOne({ token: token, user: details.payload.id }).populate('user')

                // Check if token is valid and user exists in database
                if (!tokenDetails) {
                    return res.status(401).json({ message: CommonMessage.middleware.validToken, success: false })
                }

                // Set user details in request object to access in other middlewares or controllers
                req.token = token
                req.tokenDetails = tokenDetails
                req.userDetails = tokenDetails.user

                // Check if user is authenticated and authorized to access sensitive apis
                if (!req.userDetails) {
                    return res.status(401).json({ message: CommonMessage.middleware.unauthorized, success: false })
                }

                // If user is authenticated and authorized to access sensitive apis, then proceed to next middleware or controller
                next()

            }).catch((error) => {
                return res.status(401).json({ message: CommonMessage.middleware.validToken, success: false })
            })

        } else {
            // If token is not provided in header, then return error message to client
            return res.status(401).json({ message: CommonMessage.middleware.requireToken, success: false })
        }
    } catch (error) {
        res.status(500).json(CommonMessage.commonError(error))
    }
}
