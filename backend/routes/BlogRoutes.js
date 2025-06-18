// This file is generate routes for do blog operations.
const { createBlog, updateBlog, deleteBlog, getBlogs, getBlogDetails } = require('../controllers/BlogController')
const { isAuthorized } = require('../middleware')
const validationMiddleware = require('../middleware/validationMiddleware')
const { createBlogValidation, updateBlogValidation, deleteBlogValidation } = require('../validation/BlogValidation')

const Router = require('express').Router()

Router.route('/create').post(isAuthorized,[createBlogValidation, validationMiddleware], createBlog)
Router.route('/update/:id').put(isAuthorized, [updateBlogValidation, validationMiddleware],updateBlog)
Router.route('/delete/:id').delete(isAuthorized, [deleteBlogValidation, validationMiddleware], deleteBlog)
Router.route('/get-all').get(getBlogs)
Router.route('/get-details/:id').get(getBlogDetails)

module.exports = Router