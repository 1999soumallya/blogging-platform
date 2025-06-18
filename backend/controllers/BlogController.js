const { commonError, blogs } = require("../helpers/CommonMessage")
const { pagination } = require("../helpers/Helpers")
const BlogModel = require("../models/BlogModel")

exports.createBlog = (req, res) => {
    try {
        const { userDetails } = req
        const { author, content, title } = req.body

        BlogModel.create({ user: userDetails._id, author, content, title }).then((details) => {
            res.status(200).json({
                message: blogs.create.success,
                success: true,
                data: details
            })
        }).catch((error) => {
            res.status(400).json({ message: blogs.create.failed, success: false, error: error.stack })
        })
    } catch (error) {
        res.status(500).json(commonError(error))
    }
}

exports.updateBlog = (req, res) => {
    try {
        const { userDetails } = req
        const { id } = req.params
        const { author, content, title } = req.body

        BlogModel.findOneAndUpdate({ user: userDetails._id, _id: id }, { author, content, title }, { new: true }).then((details) => {
            if (!details) {
                return res.status(200).json({ message: blogs.update.notfound, success: false })
            }
            res.status(200).json({ message: blogs.update.success, success: true, data: details })
        }).catch((error) => {
            res.status(400).json({ message: blogs.update.failed, success: false, error: error.stack })
        })
    } catch (error) {
        res.status(500).json(commonError(error))
    }
}

exports.deleteBlog = (req, res) => {
    try {
        const { userDetails } = req
        const { id } = req.params

        BlogModel.findOneAndUpdate({ user: userDetails._id, _id: id }, { isDeleted: true }, { new: true }).then((details) => {
            if (!details) {
                return res.status(200).json({ message: blogs.delete.notfound, success: false })
            }
            res.status(200).json({ message: blogs.delete.success, success: true, data: details })
        }).catch((error) => {
            res.status(400).json({ message: blogs.delete.failed, success: false, error: error.stack })
        })

    } catch (error) {
        res.status(500).json(commonError(error))
    }
}

exports.getBlogs = async (req, res) => {
    try {
        const { limit = 10, page = 1 } = req.query

        const paginationObject = await pagination(Number(limit), Number(page), await BlogModel.countDocuments({ isActive: true }))

        BlogModel.find({ isActive: true }).limit(paginationObject.limit).skip(paginationObject.skip).then((response) => {
            res.status(200).json({ message: blogs.getAll.success, success: true, data: response, pagination: paginationObject })
        }).catch((error) => {
            res.status(400).json({ message: blogs.getAll.failed, success: false, error: error.stack })
        })

    } catch (error) {
        res.status(500).json(commonError(error))
    }
}

exports.getBlogDetails = (req, res) => {
    try {
        const { id } = req.params

        BlogModel.findOne({ _id: id }, { type: 0 }).then((response) => {
            if (!response) {
                return res.status(200).json({ message: blogs.singleDetails.notfound, success: false })
            }
            res.status(200).json({ message: blogs.singleDetails.success, success: true, data: response })
        }).catch((error) => {
            res.status(400).json({ message: blogs.singleDetails.failed, success: false, error: error.stack })
        })

    } catch (error) {
        res.status(500).json(commonError(error))
    }
}