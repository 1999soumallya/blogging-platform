const { validationResult } = require("express-validator");
const { validationError } = require("../helpers/CommonMessage");

// This middleware function is used for validate incoming requests.
const validationMiddleware = async (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json(validationError(validationResult(req).array()))
    }
    next()
}

module.exports = validationMiddleware