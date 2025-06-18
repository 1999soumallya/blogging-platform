const CommonMessage = require("../helpers/CommonMessage")

// Middleware to convert string to object or array before processing request body when user sent from data but it content any array or object
exports.convertJson = (req, res, next) => {
    try {
        // Check if fields is sent from data type as string
        const { fields } = req.body

        if (fields) {
            const fieldsArray = JSON.parse(fields)

            if (fieldsArray.length && fieldsArray.length > 0) {
                for (const element of fieldsArray) {
                    req.body[element] = JSON.parse(req.body[element])
                }
            }
        }
        next()

    } catch (error) {
        res.status(500).json(CommonMessage.commonError(error))
    }
}