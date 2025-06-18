const { body } = require("express-validator");
const UserModel = require("../models/UserModel");

// This validation array is used for validate user details and do registration
exports.registerValidation = [
    body("firstName").notEmpty().withMessage('Provide your first name details for registration'),
    body("lastName").notEmpty().withMessage('Provide your last name details for registration'),
    body("email").notEmpty().withMessage('Provide your email id details for registration').isEmail().withMessage('Provide valid email id details for registration').custom(async (value) => {
        const existingUser = await UserModel.findOne({ email: value });
        if (existingUser) {
            throw new Error('User already exists with this email id');
        }
        return true;
    }),
    body("password").notEmpty().withMessage('Provide your password').isLength({ min: 8 }).withMessage('Provide valid password and must be grater then 8 character'),
    body("confirmPassword").notEmpty().withMessage('Provide your password again').custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('Password and confirm password is not same')
        }
        return true
    }),
]

// This validation array is use for validate user login
exports.loginValidation = [
    body("userName").notEmpty().withMessage('Provide your username for login you account'),
    body("password").notEmpty().withMessage('Provide your password for login you account')
]
