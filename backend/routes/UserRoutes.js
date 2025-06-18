// This file is generate routes for do user operations.

const AuthRouter = require("express").Router();

const { register, login, userDetails, logout } = require("../controllers/UserController")
const { isAuthorized } = require("../middleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const { registerValidation, loginValidation } = require("../validation/UserValidation")

AuthRouter.route('/register').post([registerValidation, validationMiddleware], register)
AuthRouter.route('/login').post([loginValidation, validationMiddleware], login)
AuthRouter.route('/logout').get(isAuthorized, logout)
AuthRouter.route('/').get(isAuthorized, userDetails)

module.exports = AuthRouter