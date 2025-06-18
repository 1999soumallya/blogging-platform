const { default: mongoose } = require("mongoose");

const BlogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

BlogSchema.pre('countDocuments', function (next) {
    this.where({ isDeleted: false })
    this.select('-isDeleted')
    next()
})

BlogSchema.pre('find', function (next) {
    this.where({ isDeleted: false })
    this.select('-isDeleted')
    next()
})

BlogSchema.pre('findOne', function (next) {
    this.where({ isDeleted: false })
    this.select('-isDeleted')
    next()
})

BlogSchema.pre('findOneAndDelete', function (next) {
    this.where({ isDeleted: false })
    this.select('-isDeleted')
    next()
})

BlogSchema.pre('findOneAndReplace', function (next) {
    this.where({ isDeleted: false })
    this.select('-isDeleted')
    next()
})

BlogSchema.pre('findOneAndUpdate', function (next) {
    this.where({ isDeleted: false })
    this.select('-isDeleted')
    next()
})

module.exports = mongoose.model("blogs", BlogSchema)