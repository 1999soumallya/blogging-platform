const { body, param } = require("express-validator");
const BlogModel = require("../models/BlogModel");

// This validation function is work for creating a blogs
exports.createBlogValidation = [
    body("author").notEmpty().withMessage("Provide your blog author for create").isString().withMessage("Provide your blog author for create"),
    body("title").notEmpty().withMessage("Provide your blog title for create").isString().withMessage("Provide your blog title for create"),
    body("content").notEmpty().withMessage("Provide your blog content for create").isString().withMessage("Provide your blog content for create"),
]

// This validation function is work for updating a blog and checking details
exports.updateBlogValidation = [
    param("id").notEmpty().withMessage("Provide blog id for update").isMongoId().withMessage('Provide valid blog id for update').custom(async (value, { req }) => {
        const result = await BlogModel.findOne({ _id: value, user: req.userDetails._id });
        if (!result) {
            throw new Error('Blog is not exists provide correct blog id for update');
        } else {
            return true;
        }
    }),
    body("author").notEmpty().withMessage("Provide your blog author for update").isString().withMessage("Provide your blog author for update"),
    body("title").notEmpty().withMessage("Provide your blog title for update").isString().withMessage("Provide your blog title for update"),
    body("content").notEmpty().withMessage("Provide your blog content for create").isString().withMessage("Provide your blog content for create"),
]

// This validation function is work for deleting a blog and checking details
exports.deleteBlogValidation = [
    param("id").notEmpty().withMessage("Provide blog id for delete").isMongoId().withMessage('Provide valid blog id for delete').custom(async (value, { req }) => {
        const result = await BlogModel.findOne({ _id: value, user: req.userDetails._id });
        if (!result) {
            throw new Error('blog is not exists provide correct blog id for delete');
        } else {
            return true;
        }
    }),
]
