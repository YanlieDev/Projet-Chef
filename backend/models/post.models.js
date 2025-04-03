const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            minLength: 3,
            maxLength: 280,
            required: true
        }
    } , { timestamps: { createdAt: true} }
)
module.exports = mongoose.model('post', postSchema )